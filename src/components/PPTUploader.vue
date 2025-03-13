<template>
  <div class="upload-container-top">
    <el-upload 
      :key="uploadKey"
      class="upload-content"
      drag
      action="#"
      :limit="1"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      @change="handleChange"
    >
      <div class="el-upload__text">
        <img class="upload-icon" src="/static/上传.png" alt="pic"><br>
        将文件拖到此处 <br>-或-<br> 
        <em>点击上传</em>
      </div>
    </el-upload>

    <div class="content-section">
      <p class="title">教学内容</p>
      <p class="tip">*由上传内容提取的教学文本</p>
      <textarea v-model="teachingContent" rows="10" cols="50" readonly>
      </textarea>
      <!-- <p class="word-count">共 {{ contentLength }} 字</p> -->
    </div>
  </div>
  
  <div class="language-section">
    <p class="title">语种替换</p>
    <p class="tip1">*选择语言后自动翻译教学文本</p>
    <textarea v-model="translatedContent" rows="10" cols="50" readonly></textarea>
  </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import eventBus from "@/eventBus";
const fileList = ref([]);
const teachingContent = ref('');
const languagesMap = {
  '中文': '你好，欢迎使用声动课堂！希望能够为你提供帮助。',
  '英语': 'This is a set of static teaching text, used to display the extracted text from the PPT.',
  '日语': 'これは、PPTから抽出されたテキストを表示するために使用される一連の静的教科書テキストです。',
  '韩语': '이 static 교육 텍스트는 PPT에서 추출 된 텍스트를 표시하기 위해 사용됩니다.'
};
const translatedContent = ref('');

const selectedFile = ref(null); // 存储用户上传的文件
const emit = defineEmits(["file-upload"]); // 触发事件，通知父组件

// 检查文件大小
const beforeUpload = (file) => {
  console.log("准备上传的文件:", file);
  fileList.value = []; 

  const isLt500K = file.size / 1024 < 500;
  if (!isLt500K) {
    return false; // 返回false阻止上传
  }
  return true;
};

// 文件列表变化处理，用于覆盖旧文件
const handleChange = (uploadFile, uploadFiles) => {
  console.log("文件上传变化:", uploadFile);
  console.log("当前文件列表:", uploadFiles);

  if (!uploadFile || uploadFile.length === 0) {
    console.error("没有获取到文件！");
    return;
  }
  const file = uploadFile.raw || uploadFile; // 兼容不同情况
  console.log("选中的文件:", file);
  console.log("文件列表:", fileList);

  // // 清空文件列表
  fileList.value = [];

  // // 立即更新文件列表
  fileList.value.push(file);

  handleSuccess();
  emit("file-upload", file); // 触发上传事件
  console.log("触发 file-upload 事件");
};

// 当超过文件数量限制时，自动替换旧文件
const handleExceed = (files) => {
  // 移除第一个（也是唯一的）旧文件
  fileList.value = [];
  // 添加新文件
  fileList.value.push(files[0]);
  handleSuccess();
};

const handleSuccess =  async () => {
  teachingContent.value = '';
  translatedContent.value = '';
  try {
    const response = await fetch('/static/教学文本.txt'); // 确保文件在 public 目录下
    if (!response.ok) {
      throw new Error('❌ 加载失败');
    }
    const text = await response.text();
    teachingContent.value = translatedContent.value = text;
  } catch (error) {
    console.error('❌ 读取本地文本失败:', error);
  }
};

const handleRemove = () => {
  teachingContent.value = '';
  fileList.value = [];
};

const contentLength = computed(() => teachingContent.value.length);

watch(() => eventBus.getLanguage(), (newLang) => {
  translatedContent.value = languagesMap[newLang] || teachingContent.value;
  
});
</script>

<style scoped>
::v-deep .el-upload-list__item {
  position: absolute;
  top: -200px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
} 
::v-deep .el-upload-list__item-info{
  color: green !important;
}
.upload-container-top{
  display:flex;
  margin-top:20px;
  margin-left:40px;
  width:680px;
  .upload-content{
    margin-top:37px;
    height:180px;
  }
  .content-section{
    margin-left:20px;
    margin-top: 10px;
    margin-right:20px;
    position:relative;
    .tip{
      position:absolute;
      z-index:99;
      font-size:14px;
      color:#767A7D;
      margin-top:-30px;
      right:0px;
      height:25px;
    }
    textarea{
      resize: none;
      width: 100%;
      height:140px;
      background-color:rgba(60, 67, 75, 0.66);
      color:white;
      border-radius: 10px;
      border:none;
      padding:10px 10px 10px 10px;
      backdrop-filter: blur(5px);
      border-top: 0.5px solid rgba(255,255,255,0.3);
      border-left: 0.5px solid rgba(255,255,255,0.3);
      box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);
      
    }
    .word-count{
      position:absolute;
      bottom:-1px;
      right:10px;
      font-size: 14px;
      color: #666;
    }
    
    .title{
      background-color:transparent;
      color:#767A7D;
      font-size:18px;
      margin-left:20px;
      margin-top:-10px;
      margin-bottom:10px;
    }
  }
}
.language-section{
  margin-left:40px;
  margin-bottom:10px;
  position:relative;
  textarea{
    resize: none;
    width: 660px;
    height:90px;
    background-color:rgba(60, 67, 75, 0.66);
    color:white;
    border-radius: 10px;
    border:none;
    padding:10px 10px 10px 10px;
    backdrop-filter: blur(5px);
    border-top: 0.5px solid rgba(255,255,255,0.3);
    border-left: 0.5px solid rgba(255,255,255,0.3);
    box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);
  }
  .tip1{
    position:absolute;
    z-index:99;
    font-size:14px;
    color:#767A7D;
    right:-200px;
    top:10px;
    height:25px;
  }
  .title{
    background-color:transparent;
    color:#767A7D;
    font-size:18px;
    margin-left:20px;
    margin-top:-10px;
    margin-bottom:10px;
  }
}
::v-deep .el-upload-dragger{
  background-color: #767A7D;
  border:none;
  width:280px;
  height:160px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}
::v-deep .el-upload__text{
  color:white;
}
.upload-icon{
  width:23px;
  height:23px;
}
</style>