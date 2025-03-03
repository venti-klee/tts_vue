<template>
  <div >
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <p-p-t-uploader ></p-p-t-uploader>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-row>
        <sound-adjust ></sound-adjust>
        </el-row>
        <el-row>
          <div>
            <virtual-avatar-selector
                @update:avatarIndex="handleAvatarIndexChange"
            />
<!--            <div v-if="selectedAvatar">-->
<!--              <p>选中的虚拟形象：{{ selectedAvatar.name }}</p>-->
<!--              <img :src="selectedAvatar.image" alt="Selected Avatar" />-->
<!--            </div>-->
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
</style>