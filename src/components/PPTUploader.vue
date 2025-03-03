<template>
  <el-upload
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
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处 或 <em>点击上传</em></div>
  </el-upload>

  <div class="content-section">
    <h3>教学内容</h3>
    <textarea v-model="teachingContent" rows="10" cols="50" readonly></textarea>
    <p>共 {{ contentLength }} 字</p>
  </div>
  <div class="language-section">
    <h3>语种替换</h3>
    <textarea v-model="translatedContent" rows="10" cols="50" readonly></textarea>
  </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import eventBus from "@/eventBus";
const fileList = ref([]);
const teachingContent = ref('');
const languagesMap = {
  'zh-CN': '这是一组静态的教学文本，用于展示从PPT提取的文本内容。',
  'en': 'This is a set of static teaching text, used to display the extracted text from the PPT.',
  'ja': 'これは、PPTから抽出されたテキストを表示するために使用される一連の静的教科書テキストです。',
  'ko': '이 static 교육 텍스트는 PPT에서 추출 된 텍스트를 표시하기 위해 사용됩니다.'
};
const translatedContent = ref('');

// 检查文件大小
const beforeUpload = (file) => {
  const isLt500K = file.size / 1024 < 500;
  if (!isLt500K) {
    return false; // 返回false阻止上传
  }
  return true;
};

// 文件列表变化处理，用于覆盖旧文件
const handleChange = (uploadFile) => {
  if (fileList.value.length >= 1) {
    handleExceed(uploadFile);
  } else {
    fileList.value.push(uploadFile[0]);
    handleSuccess();
  }
};

// 当超过文件数量限制时，自动替换旧文件
const handleExceed = (files) => {
  // 移除第一个（也是唯一的）旧文件
  fileList.value = [];
  // 添加新文件
  fileList.value.push(files[0]);
  handleSuccess();
};

const handleSuccess = () => {
  teachingContent.value = '这是一组静态的教学文本，用于展示从PPT提取的文本内容。';
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
.content-section,
.language-section {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  width: 100%;
  height: 150px;
  background-color: #3a3a3a;
  color: #fff;
  border: none;
  border-radius: 5px;
}
</style>