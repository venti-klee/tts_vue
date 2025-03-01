<template>
  <div class="upload-container">
    <el-row>
      <!-- 文件上传按钮 -->
      <el-upload
          action="/"
          ref="upload"
          accept=".txt"
          :before-upload="beforeUpload"
          :disabled="fileList.length !== 0"
          :default-file-list="fileList"
      >
        <span>教学内容</span>
        <el-button type="primary" :disabled="fileList.length !== 0">上传</el-button>
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
          :maxlength="2000"
          @input="limitTextLength"
          ref="textareaRef"
      ></textarea>
      <!-- 显示文字数量 -->
      <div class="word-count">
        共：{{ wordCount }} / 2000 字
      </div>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";
import { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css';

const emit = defineEmits(["update:textContent"]); // 定义自定义事件
const fileList = ref([]); // 用于存储文件列表
const textData = ref(""); // 用于存储文件内容
const textareaRef = ref(null); // 用于获取文本框的引用

// 读取文件内容
const read = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    textData.value = content; // 直接覆盖之前的文本内容
    emit("update:textContent", content); // 将内容传递给父组件
  };
  reader.readAsText(file, "UTF-8"); // 以文本形式读取文件
};

// 文件上传前的处理
const beforeUpload = (file) => {
  fileList.value = [file]; // 更新文件列表
  textData.value = ""; // 清空之前的文本内容
  console.log("选择了文件 beforeUpload");
  read(file); // 读取文件内容
  return false; // 阻止默认上传行为
};

// 限制文字数量不超过 2000 字
const limitTextLength = () => {
  if (textData.value.length > 2000) {
    textData.value = textData.value.slice(0, 2000); // 超出部分截断
    ElMessage.warning('文字数量不能超过2000字');
  }
};

// 计算当前文字数量
const wordCount = computed(() => textData.value.length);

// 插入文本内容
const insertText = (text) => {
  const textarea = textareaRef.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textData.value = textData.value.substring(0, start) + text + textData.value.substring(end);
  textarea.selectionStart = start + text.length;
  textarea.selectionEnd = start + text.length;
};

// 切换连续播放标签
const toggleRepeat = () => {
  const textarea = textareaRef.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (start !== end) {
    textData.value = textData.value.substring(0, start) + '<repeat>' + textData.value.substring(start, end) + '</repeat>' + textData.value.substring(end);
    textarea.selectionStart = start + 8; // "<repeat>".length
    textarea.selectionEnd = end + 9; // "</repeat>".length
  } else {
    ElMessage.warning('请先选择一段文本');
  }
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