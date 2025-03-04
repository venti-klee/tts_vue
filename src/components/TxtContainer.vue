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
        <el-button type="primary" class="upload-btn">上传</el-button>
      </el-upload>
    </el-row>
    <el-row>
      <!-- 配置图标按钮 -->
      <div class="config-buttons">
        <div class="config-button-item">
          <img src="/static/暂停.png" alt="pic" class="img1">
          <button @click="insertText('</pause>')">插入停顿</button>
        </div>
        <div class="config-button-item">
          <img src="/static/加载小.png" alt="pic" class="img1">
          <button @click="toggleRepeat">连续播放</button>
        </div>
        <div class="config-button-item">
          <img src="/static/headphones.png" alt="pic" class="img1">
          <button @click="insertText('<childVoice>')">儿化音</button>
        </div>
        <div class="config-button-item">
          <img src="/static/时间.png" alt="pic" class="img1">
          <button @click="insertText('<date>')">插入日期</button>
        </div>
        <div class="config-button-item">
          <img src="/static/呼气.png" alt="pic" class="img1">
          <button @click="insertText('<breath>')">换气声</button>
        </div>
        <div class="config-button-item">
          <img src="/static/笑脸.png" alt="pic" class="img1">
          <button @click="insertText('<laughter>')">插入笑声</button>
        </div>
      </div>
    </el-row>
    <el-row class="text-area">
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
        共&nbsp;{{ effectiveWordCount }} / 2000 字
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
  button {
    margin: 0 5px;
  }
.upload-container {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  
  margin-top: 20px;
  width:680px;
  span{
    background-color:transparent;
    color:#767A7D;
    font-size:18px;
    margin-left:20px;
  }
  .upload-btn {
    margin-left:500px;
    background-color: #25AEBF;  /* 按钮背景色 */
    color: white;  /* 字体颜色 */
    width: 69px;                  /* 宽度 600px */
    height: 30px;                  /* 高度 500px */
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    display: flex;               /* 使用 flex 布局 */
    justify-content: center;     /* 水平居中 */
    align-items: center;         /* 垂直居中 */
    cursor: pointer;  /* 鼠标悬停变成小手 */
    font-size: 16px;  /* 字体大小 */
    transition: background-color 0.2s ease;
    border:none;
  }
  .upload-btn:hover{
    background-color: #1D94A4; 
  }
  .config-buttons{
    display: flex;
    margin-top: 15px;
    background-color:transparent;
    color:white;
    z-index:999;
    padding-bottom:10px;
    border-bottom: 1px solid #767A7D;
    width:100%
  }
  .config-button-item{
    margin-left:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .img1{
      width:23px;
      height:23px;
    }
    button{
      background-color:transparent;
      color:white;
      border:none;
      outline: none; /* 移除点击时的轮廓线 */
      box-shadow: none; /* 移除可能的阴影 */
    }
  }
  .text-area{
    position:relative;
    padding:0;
    margin:0;
    width:100%;
    top:-75px;
    height:250px;
  }
  .text-area::before{
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 65px;
    background-color: rgba(60, 67, 75, 1);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    z-index: 2;
    border-top: 0.5px solid rgba(255,255,255,0.3);
    border-left: 0.5px solid rgba(255,255,255,0.3);
  }
  textarea {
    margin-top: 10px;
    resize: none;
    width: 100%;
    max-width: 680px;
    background-color:rgba(60, 67, 75, 0.66);
    color:white;
    border-radius: 10px;
    border:none;
    padding:70px 10px 10px 10px;
    backdrop-filter: blur(5px);
    border-top: 0.5px solid rgba(255,255,255,0.3);
    border-left: 0.5px solid rgba(255,255,255,0.3);
    box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);
    }
  
  .word-count {
    position:absolute;
    bottom: -25px;
    right:10px;
    font-size: 14px;
    color: #666;
  }
}






</style>