<template>
  <el-container style="height: 100vh;">
    <!-- 主内容区 -->
    <el-container class="main-content">
      <el-header>
        <img class="goback-img" src="/static/返回2.png" @click="goBack" alt="pic">
        <!-- <el-button type="text" @click="goBack">返回</el-button> -->
      </el-header>
      <el-main>
        <video ref="videoPlayer" width="100%" controls>
          <source src="../assets/static/vtuber.mp4" type="video/mp4" >
          Your browser does not support the video tag.
        </video>
      </el-main>
    </el-container>

    <!-- 历史记录栏 -->
    <div class="history-panel" :class="{'expanded': isHistoryVisible}" @click="hideHistory">
      <div class="history-toggle" @click="toggleHistory">
        <i :class="['el-icon-arrow-right', { 'rotate': isHistoryVisible }]"></i>
        <span class="history-label">历史记录</span>
        <img class="img1" src="/static/展开.png" alt="pic">
      </div>
      <transition name="slide">
        <div v-if="isHistoryVisible" class="history-list" >
          <el-card v-for="(record, index) in historyRecords" :key="index" class="box-card" @click.stop="downloadAudio">
            <img class="img2" src="/static/下载.png" alt="pic">
            <span>{{ record }}</span>
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
      '3/2/09:45.MP4',
      '3/1/10:00.MP4',
      '2/28/14:25.MP4',
      '2/28/13:13.MP4',
    ]);

    const router = useRouter();
    const isHistoryVisible = ref(false);
    const videoSrc = ref('');

    const toggleHistory = () => {
      isHistoryVisible.value = !isHistoryVisible.value;
    };

    const hideHistory = (event) => {
      // 只有点击的是 `history-list` 的背景，才会关闭
      if (event.target.classList.contains("history-panel")) {
        isHistoryVisible.value = false;
      }
    };

    const downloadAudio = () => {
      const audioUrl = "/static/audios/audio1.wav";
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = "audio1.wav";
      link.click();
    };
    const goBack = () => {
      router.go(-1);
    };

    return {
      historyRecords,
      toggleHistory,
      hideHistory,
      goBack,
      downloadAudio,
      isHistoryVisible,
      videoSrc,
    };
  },
};
</script>

<style scoped>
:deep .el-main{
  display:flex;
  align-items: center;
  justify-content: center;
}
video{
  max-width:1120px;
  display:flex;
  align-items: center;
  justify-content: center;
}
.goback-img{
  width: 45px;
  height:40px;
  margin-top:20px;
}
.img1{
  width: 20px;
  height:20px;
  margin-top:10px;
}
.img2{
  width: 20px;
  height:20px;
  position:absolute;
  left:13px;
}
.history-panel {
  position: relative;
  background-color: rgba(219,219,218,0.27);
  width: 60px; /* 默认折叠状态 */
  transition: width 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:0;
}

.history-panel.expanded {
  padding:0;
  width: 180px; /* 展开状态 */
  display: block;
  justify-content: initial;
  align-items: initial;
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
  display:flex;
  align-items:center;
  justify-content:center;
}

.history-list {
  overflow-y: auto;
  padding: 60px 0px 0px 0px;
  max-height: 70vh;
  background-color:transparent;
  width: 100%;
  box-sizing: border-box;
  position:absolute;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
  font-size:16px;
}
.history-list.expanded {
  transform: translateX(0);
}
.history-panel.expanded .history-label,
.history-panel.expanded .img1 {
  display: none;
}
::v-deep .el-card__body{
  padding:5px 10px 5px 25px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;

}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.main-content {
  z-index:999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
}

.box-card {
  margin-bottom: 15px;
  cursor: pointer;
  width:160px;
}
</style>