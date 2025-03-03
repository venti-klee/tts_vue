<template>
  <!-- 外层容器，用于包含整个虚拟形象选择器 -->
  <div class="avatar-selector-container">
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
  { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
  { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
  { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
  { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
  { image: require("@/assets/static/luca.jpg"), name: 'luca老师' },
  { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
  { image: require("@/assets/static/vox.jpg"), name: 'vox老师' },
  { image: require("@/assets/static/vox.jpg"), name: 'vox老师' }// ... 其他虚拟形象
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
.avatar-selector-container {
  width: 100%;
  overflow: hidden;
}

.avatars-scroll-container {
  display: flex;
  overflow-x: auto;
  /* 使滚动条平滑 */
  scroll-behavior: smooth;
}

.avatars-container {
  display: flex;
  /* 使虚拟形象之间的间隔均匀分布 */
  gap: 10px;
  /* 设置容器宽度，以展示5个虚拟形象 */
  width: 500px; /* 根据实际情况调整 */
}

.avatar-item {
  flex: 0 0 auto;
  cursor: pointer;
  position: relative;
  width: 100px; /* 根据实际情况调整 */
  transition: transform 0.3s ease;
}

.avatar-item.selected img {
  border: 2px solid #409eff;
}

.avatar-item img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.avatar-name {
  text-align: center;
  margin-top: 8px;
}
</style>