<script setup>

import PDFUploader from "@/components/PDFUploader.vue";
import SoundAdjust from "@/components/SoundAdjust.vue";
import VoiceSelector from "@/components/VoiceSelector.vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const startGeneratePDF = () => {
  // 假设您希望在跳转前执行一些操作，比如开始生成视频
  // generateVideo();

  // 跳转到VideoPage组件，但不改变URL路径
  router.push({ name: 'pdf_subtitle' }, { replace: true });
};
</script>

<template>
  <br>
  <div>
    <el-row>
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <p-d-f-uploader class="pdf-upload-container"></p-d-f-uploader>
        <el-row>
          <el-button type="primary" class="btn1" @click="startGeneratePDF">生成有声书</el-button>
        </el-row>
      </el-col>
      <el-col class="a" :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
        <el-row >
          <sound-adjust class="sound-adjust-cotainer"></sound-adjust>
        </el-row>
        <el-row>
          <!-- <voice-selector1 class="voice-select-container"></voice-selector1> -->
          <voice-selector class="voice-select-container"></voice-selector>
        </el-row>
      </el-col>

    </el-row>

  </div>
</template>

<style scoped>
*{
  padding:0;
  margin:0;
}
.pdf-upload-container{
  margin-left:40px;
  margin-top:15px;
  width:680px;
}
.a{
  margin:0;
  padding:0;
}
.sound-adjust-cotainer{
  margin-left:-10px;
  width:91%;
  margin-top:-3px;
  padding:0;
}

.voice-select-container{
  margin-right:40px;
  margin-left:-10px;
  margin-top:0px;
  height:150px;
  padding:0;
}

.btn1 {
  margin-right:0px;
  margin-top:10px;
  width: 680px;
  margin-left: 40px;
  height: 40px;
  background-color: #25AEBF;
  color: white;
  border-radius: 10px;
  border: none;
}

.btn1:hover {
  background-color: #1D94A4;
}
</style>