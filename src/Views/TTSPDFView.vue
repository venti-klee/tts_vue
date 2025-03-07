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
        <p-d-f-uploader ></p-d-f-uploader>
        <el-row>
          <el-button type="primary" class="btn1" @click="startGeneratePDF">生成有声书</el-button>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
        <el-row>
          <sound-adjust ></sound-adjust>
        </el-row>
        <el-row>
          <voice-selector></voice-selector>
        </el-row>
      </el-col>

    </el-row>

  </div>
</template>

<style scoped>

.btn1 {
  margin-right:60px;
  margin-top:20px;
  width: 98%;
  margin-left: 0;
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