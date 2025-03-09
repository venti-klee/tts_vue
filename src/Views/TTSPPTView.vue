<template>
  <div >
    <el-row>

        <!-- ppt上传+文本解析 -->
        <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
          <el-col >
            <p-p-t-uploader class="ppt-upload-container" >11</p-p-t-uploader>
            <el-button type="primary" class="btn1" @click="startGenerateVideo">生成视频</el-button> 
          </el-col>
        </el-col>

        <!--声音样本-->
        <el-row>
          <voice-selector class="voice-select-container" @select-voice="handleVoiceSelect"></voice-selector>
        </el-row>
        
      <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
        <el-row>
          <el-col :span="24">
            <sound-adjust class="sound-adjust-cotainer"></sound-adjust>
          </el-col>
        </el-row>
        <el-row>
          <div>
            <virtual-avatar-selector class="teacher-select-cotainer"
                @update:avatarIndex="handleAvatarIndexChange"
            />
            <!-- <div v-if="selectedAvatar">
              <p>选中的虚拟形象：{{ selectedAvatar.name }}</p>
              <img :src="selectedAvatar.image" alt="Selected Avatar" />
            </div> -->
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
import VoiceSelector from "@/components/VoiceSelector.vue";
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
*{
  margin:0;
  padding:0;
}
.ppt-upload-container{
  margin-left:40px;
  margin-top:15px;
  width:660px;

}
.sound-adjust-cotainer{
  margin-left:25px;
  /* margin-right:25px; */
  width:91%;
  margin-top:-368px;
  padding:0;

}
.voice-select-container{
  margin-left:40px;
  width:680px;
  margin-top:-10px;
}
.teacher-select-cotainer{
  margin-left:25px;
  margin-top:10px;
  margin-right:-65px;
}
.btn1 {
  position:absolute;
  width:680px;
  bottom:10px;
  margin-left: 40px;
  height: 40px;
  background-color: #25AEBF;
  color: white;
  border-radius: 10px;
  border: none;
  z-index:999;
}
.btn1:hover {
  background-color: #1D94A4;
}
</style>