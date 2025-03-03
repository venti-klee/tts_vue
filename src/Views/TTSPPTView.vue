<template>
  <div >
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <p-p-t-uploader ></p-p-t-uploader>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <sound-adjust ></sound-adjust>
      </el-col>

    </el-row>


  </div>
</template>

<script setup>
import PPTUploader from '@/components/PPTUploader.vue';
import SoundAdjust from "@/components/SoundAdjust.vue";
</script>

<style scoped>
.app {
  display: flex;
  gap: 20px;
  padding: 20px;
}
</style>