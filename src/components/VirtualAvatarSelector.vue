<template>
  
  <!-- 外层容器，用于包含整个虚拟形象选择器 -->
  <div class="avatar-selector-container">
    <p class="title">虚拟教师</p>
    <!-- 滚动容器，用于横向滚动查看虚拟形象 -->
    <div class="avatars-scroll-container" ref="scrollContainer">
      
      <!-- 虚拟形象容器，包含所有虚拟形象 -->
      <div class="avatars-container" ref="avatarsContainer">
        <!-- 循环渲染虚拟形象 -->
        <div
            v-for="(avatar, index) in avatars"
            :key="index"
            class="avatar-item"
            :class="{ selected: index === selectedAvatarIndex }"
            @click="selectAvatar(index)"
        >
          <!-- 虚拟形象图片 -->
          <img :src="avatar.image" :alt="avatar.name" />
          <!-- 虚拟形象名称 -->
          <div class="avatar-name">{{ avatar.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineEmits, onMounted, nextTick} from 'vue';

// 定义虚拟形象数组，包含图片路径和名称
const avatars = ref([
  { image: require("@/assets/static/v0.png"), name: '无老师' },
  { image: require("@/assets/static/v1_bai.png"), name: '夜莺老师' },
  { image: require("@/assets/static/v3_bai.png"), name: '龙女老师' },
  { image: require("@/assets/static/v2_bai.png"), name: 'Liny老师' },
  { image: require("@/assets/static/v5_bai.png"), name: 'yumi老师' },
  { image: require("@/assets/static/v6_bai.png"), name: '乌梢老师' },
  { image: require("@/assets/static/v4_bai.png"), name: 'Chris老师' },
]);

// 当前选中的虚拟形象索引
const selectedAvatarIndex = ref(0);

// 定义事件发射器，用于向父组件发送选中的虚拟形象索引
const emit = defineEmits(['update:avatarIndex']);

// 滚动容器的引用
const scrollContainer = ref(null);

// 选择虚拟形象的函数，更新选中索引并通知父组件
const selectAvatar = (index) => {
  selectedAvatarIndex.value = index;
  emit('update:avatarIndex', index);
  scrollIntoView(index);
};

// 平滑滚动到指定虚拟形象的函数
const scrollIntoView = (index) => {
  nextTick(() => {
    const avatarItem = scrollContainer.value.children[index];
    if (avatarItem) {
      avatarItem.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
    }
  });
};

// 处理滚动事件的函数，用于更新虚拟形象的位置（如果需要）
// eslint-disable-next-line no-unused-vars
const handleScroll = () => {
  // 可以在这里添加逻辑来更新虚拟形象的位置
};

// 在组件挂载后，平滑滚动到初始选中的虚拟形象
onMounted(() => {
  scrollIntoView(selectedAvatarIndex.value);
});
</script>

<style scoped>
.title{
  background-color:transparent;
  color:#767A7D;
  font-size:18px;
  margin-left:20px;
  margin-top:-5px;
  margin-bottom:10px;
}
.avatar-selector-container {
  margin-top:30px;
  width: 100%;
  overflow: hidden;
  resize: none;
}

.avatars-scroll-container {
  display: flex;
  overflow-x: auto;
  /* 使滚动条平滑 */
  scroll-behavior: smooth;
  background-color:rgba(60, 67, 75, 0.66);
  color:white;
  border-radius: 10px;
  border:none;
  padding:20px 25px 0 25px;
  backdrop-filter: blur(5px);
  border-top: 0.5px solid rgba(255,255,255,0.3);
  border-left: 0.5px solid rgba(255,255,255,0.3);
  box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);

}

.avatars-container {
  display: flex;
  /* 使虚拟形象之间的间隔均匀分布 */
  gap: 20px;
  /* 设置容器宽度，以展示5个虚拟形象 */
  width: 500px; /* 根据实际情况调整 */
}

.avatar-item {
  flex: 0 0 auto;
  cursor: pointer;
  position: relative;
  width: 80px; /* 根据实际情况调整 */
  transition: transform 0.3s ease;
}

.avatar-item.selected img {
  border: 2px solid #25AEBF;
}

.avatar-item img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.avatar-name {
  text-align: center;
  margin-top: 0px;
  margin-bottom:5px;
  font-size:14px;
}
</style>