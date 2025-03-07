<template>
  <div >
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <p-p-t-uploader class="ppt-upload-container" ></p-p-t-uploader>
        <el-button type="primary" class="btn1" @click="startGenerateVideo">开始生成视频</el-button>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-row>
        <sound-adjust class="sound-adjust-cotainer"></sound-adjust>
        </el-row>
        <el-row>
          <div>
            <virtual-avatar-selector class="teacher-select-cotainer"
                @update:avatarIndex="handleAvatarIndexChange"
            />
            <div v-if="selectedAvatar">
              <p>选中的虚拟形象：{{ selectedAvatar.name }}</p>
              <img :src="selectedAvatar.image" alt="Selected Avatar" />
            </div>
          </div>
        </el-row>
      </el-col>

    </el-row>


  </div>
</template>

<script setup>
import PPTUploader from '@/components/PPTUploader.vue';
import SoundAdjust from "@/components/SoundAdjust.vue";
import VirtualAvatarSelector from "@/components/VirtualAvatarSelector.vue";
import {ref} from "vue";
const selectedAvatar = ref(null);
import { useRouter } from 'vue-router';
const router = useRouter();

const startGenerateVideo = () => {
  // 假设您希望在跳转前执行一些操作，比如开始生成视频
  // generateVideo();

  // 跳转到VideoPage组件，但不改变URL路径
  router.push({ name: 'ppt_video' }, { replace: true });
};
const handleAvatarIndexChange = (index) => {
  const avatars = [
    { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
    { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
    { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
    { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
    { image: require("@/assets/static/luca.jpg"), name: 'luca老师' },
    { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
    { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
    { image: require("@/assets/static/vox.jpg"), name: 'vox老师' }// ... 其他虚拟形象要和组件中的一致
  ];
  selectedAvatar.value = avatars[index];
  console.log('Selected Avatar:', selectedAvatar.value);
};
</script>

<style scoped>
.app {
  display: flex;
  gap: 20px;
  padding: 20px;
}

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