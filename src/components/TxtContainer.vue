<template>
  <div class="upload-container">
    <el-row>
      <!-- 文件上传按钮 -->
      <el-upload
          action="/"
          ref="upload"
          accept=".txt"
          :before-upload="beforeUpload"
      >
        <span>教学内容</span>
        <el-button type="primary">上传</el-button>
      </el-upload>
    </el-row>
    <el-row>
      <!-- 配置图标按钮 -->
      <div class="config-buttons">
        <button @click="insertText('</pause>')">插入停顿</button>
        <button @click="toggleRepeat">连续播放</button>
        <button @click="insertText('<childVoice>')">儿化音</button>
        <button @click="insertText('<date>')">插入日期</button>
        <button @click="insertText('<breath>')">换气声</button>
        <button @click="insertText('<laughter>')">插入笑声</button>
      </div>
    </el-row>
    <el-row>
      <!-- 文本框用于展示文件内容 -->
      <textarea
          v-model="textData"
          rows="10"
          cols="50"
          placeholder="请选择txt文件上传教学文本或者输入文本教学内容..."
          @input="onInput"
          ref="textareaRef"
      ></textarea>
      <!-- 显示文字数量 -->
      <div class="word-count">
        共：{{ effectiveWordCount }} / 2000 字
      </div>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css';

// eslint-disable-next-line no-undef
const emit = defineEmits(["update:textContent"]); // 定义自定义事件
const fileList = ref([]); // 用于存储文件列表
const textData = ref(""); // 用于存储文件内容
const textareaRef = ref(null); // 用于获取文本框的引用

// 特殊标记列表
const specialTags = ['</pause>', '<childVoice>', '<date>', '<breath>', '<laughter>', '<repeat>', '</repeat>'];

// 读取文件内容
const read = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    textData.value = e.target.result; // 直接覆盖之前的文本内容
    onInput(); // 使用 onInput 方法检查文本长度
    emit("update:textContent", textData.value); // 将内容传递给父组件
  };
  reader.readAsText(file, "UTF-8"); // 以文本形式读取文件
};

// 文件上传前的处理
const beforeUpload = (file) => {
  fileList.value = []; // 清空文件列表，确保只保留最新上传的文件
  fileList.value.push(file); // 添加新文件到列表
  textData.value = ""; // 清空之前的文本内容
  read(file); // 读取新文件内容
  return false; // 阻止默认上传行为
};

// 计算当前有效文字数量（排除特殊标记）
const effectiveWordCount = computed(() => {
  let data = textData.value;
  specialTags.forEach(tag => {
    data = data.replaceAll(tag, '');
  });
  return data.length;
});

// 输入事件处理函数，确保不超过2000字
const onInput = () => {
  if (effectiveWordCount.value > 2000) {
    ElMessage.warning('文字数量已达到2000字，无法继续增加。');
    // 截断超出部分的文本
    while (effectiveWordCount.value > 2000) {
      textData.value = textData.value.slice(0, -1);
    }
  }
};

// 插入文本内容
const insertText = (text) => {
  if (effectiveWordCount.value + text.replace(/<\/?[^>]+>/g, '').length > 2000) {
    ElMessage.warning('插入该文本后将超过2000字限制，无法插入。');
    return;
  }
  const textarea = textareaRef.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textData.value = textData.value.substring(0, start) + text + textData.value.substring(end);
  textarea.selectionStart = start + text.length;
  textarea.selectionEnd = start + text.length;
  onInput(); // 每次插入文本后检查文本长度
};

// 切换连续播放标签
const toggleRepeat = () => {
  const textarea = textareaRef.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (start === end) {
    ElMessage.warning('请先选择一段文本');
    return;
  }
  const repeatTag = '<repeat>' + textData.value.substring(start, end) + '</repeat>';
  if (effectiveWordCount.value + repeatTag.replace(/<\/?[^>]+>/g, '').length > 2000) {
    ElMessage.warning('插入该标签后将超过2000字限制，无法插入。');
    return;
  }
  textData.value = textData.value.substring(0, start) + repeatTag + textData.value.substring(end);
  textarea.selectionStart = start + 8; // "<repeat>".length
  textarea.selectionEnd = start + 8 + textData.value.substring(start, end).length + 9; // "</repeat>".length
  onInput(); // 每次插入标签后检查文本长度
};
</script>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.config-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

button {
  margin: 0 5px;
}

textarea {
  margin-top: 10px;
  resize: none;
  width: 100%;
  max-width: 600px;
}

.word-count {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>