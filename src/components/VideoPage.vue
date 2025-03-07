<template>
  <el-container style="height: 100vh;">
    <!-- 主内容区 -->
    <el-container class="main-content">
      <el-header>
        <el-button type="text" @click="goBack">返回</el-button>
      </el-header>
      <el-main>
        <video ref="videoPlayer" width="100%" controls>
          <source :src="videoSrc" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </el-main>
    </el-container>

    <!-- 历史记录栏 -->
    <div class="history-panel" :class="{'expanded': isHistoryVisible}">
      <div class="history-toggle" @click="toggleHistory">
        <i :class="['el-icon-arrow-right', { 'rotate': isHistoryVisible }]"></i>
        <span class="history-label">历史记录</span>
      </div>
      <transition name="slide">
        <div v-if="isHistoryVisible" class="history-list">
          <el-card v-for="(record, index) in historyRecords" :key="index" class="box-card" @click="hideHistory">
            <div>{{ record }}</div>
          </el-card>
        </div>
      </transition>
    </div>
  </el-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const historyRecords = ref([
      '2/28/13:13.MP4',
      '2/28/14:25.MP4',
      '3/1/10:00.MP4',
      '3/2/09:45.MP4',
    ]);

    const router = useRouter();
    const isHistoryVisible = ref(false);
    const videoSrc = ref('');

    const toggleHistory = () => {
      isHistoryVisible.value = !isHistoryVisible.value;
    };

    const hideHistory = () => {
      isHistoryVisible.value = false;
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      historyRecords,
      toggleHistory,
      hideHistory,
      goBack,
      isHistoryVisible,
      videoSrc,
    };
  },
};
</script>

<style scoped>
.history-panel {
  position: relative;
  background-color: #2d3a4b;
  width: 60px; /* 默认折叠状态 */
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.history-panel.expanded {
  width: 240px; /* 展开状态 */
}

.history-toggle {
  cursor: pointer;
  color: white;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rotate {
  transform: rotate(90deg);
}

.history-label {
  writing-mode: vertical-rl;
  text-orientation: upright;
  margin-left: 10px;
}

.history-list {
  overflow-y: auto;
  padding: 10px;
  max-height: 70vh;
  background-color: #2d3a4b;
  width: 100%;
  box-sizing: border-box;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.main-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
}

.box-card {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>