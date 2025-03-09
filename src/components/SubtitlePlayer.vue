<template>
  <img class="goback-img" src="/static/返回2.png" @click="goBack" alt="pic">
  <div class="subtitle-player">
    <!-- 字幕分页显示 -->
    <div class="subtitles-list">
      <div class="column">
        <div
          v-for="(subtitle, index) in leftColumn"
          :key="index"
          class="subtitle-item"
          :class="{ active: isActive(index + (currentPage - 1) * subtitlesPerPage) }"
          @click="seekToSubtitle(index + (currentPage - 1) * subtitlesPerPage)"
        >
          {{ subtitle.text }}
        </div>
      </div>
      <div class="column">
        <div
          v-for="(subtitle, index) in rightColumn"
          :key="index + subtitlesPerPage / 2"
          class="subtitle-item"
          :class="{ active: isActive(index + leftColumn.length + (currentPage - 1) * subtitlesPerPage) }"
          @click="seekToSubtitle(index + leftColumn.length + (currentPage - 1) * subtitlesPerPage)"
        >
          {{ subtitle.text }}
        </div>
      </div>
    </div>

    <!-- 分页控件 -->
    <el-pagination class="pagination"
        layout="prev, pager, next"
        :total="totalItems"
        :page-size="subtitlesPerPage"
        v-model:current-page="currentPage"
        @current-change="onPageChange"
    ></el-pagination>
    
  </div>
  <!-- 音频控制组件 -->
  <div class="audio-controls">
    <button @click="rewind">
      <img class="playsound-img" src="/static/后退.png" alt="pic">
      后退
    </button>
    <img class="playsound-btn" 
      :src="isPlaying ? '/static/暂停播放.png' : '/static/播放2.png'"
      @click="playOrPause" 
      alt="pic">
    <button @click="fastForward">
      快进
      <img class="playsound-img1" src="/static/后退.png" alt="pic">
    </button>
    <div class="slider-container">
      <p>速度：</p>
      <input class="custom-slider" type="range" min="0.5" max="2" step="0.1" v-model="playbackRate"  @change="setPlaybackRate">
      <span>Speed：x{{ playbackRate }}</span>
    </div>
    
  </div>
  <!-- 音频播放器 -->
  <audio ref="audioPlayer" @timeupdate="handleTimeUpdate" @ended="handleEnded">
    <source :src="audioSrc" type="audio/wav" />
  </audio>

</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import parseSrt from 'parse-srt';
import { useRouter } from 'vue-router';

// 定义音频和字幕文件路径，假设文件位于 public 文件夹内
const audioSrc = '/static/pdf/sft_output_1600字.wav'; // 确保此路径指向 public 文件夹内的文件
const srtSrc = '/static/pdf/sft_output_1600字.srt';   // 同上

// 音频播放器引用
const audioPlayer = ref(null);
const subtitles = ref([]);
const currentSubtitleIndex = ref(0);
const currentTime = ref(0);
const currentPage = ref(1);

// 每页显示字幕数量
const subtitlesPerPage = 28;

const totalItems = computed(() => subtitles.value.length);

const paginatedSubtitles = computed(() => {
  const start = (currentPage.value - 1) * subtitlesPerPage;
  return subtitles.value.slice(start, start + subtitlesPerPage);
});

const leftColumn = computed(() => paginatedSubtitles.value.slice(0, subtitlesPerPage / 2));
const rightColumn = computed(() => paginatedSubtitles.value.slice(subtitlesPerPage / 2));

onMounted(async () => {
  try {
    const response = await fetch(srtSrc);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();
    subtitles.value = parseSrt(text);
  } catch (error) {
    console.error('Failed to fetch or parse subtitles:', error);
  }
});

const handleTimeUpdate = () => {
  currentTime.value = audioPlayer.value.currentTime;
  const currentTimeInSeconds = Math.floor(currentTime.value);
  for (let i = 0; i < subtitles.value.length; i++) {
    const subtitle = subtitles.value[i];
    if (currentTimeInSeconds >= subtitle.start && currentTimeInSeconds < subtitle.end) {
      currentSubtitleIndex.value = i;
      updateCurrentPageForSubtitle(i);
      break;
    }
  }
};

const updateCurrentPageForSubtitle = (index) => {
  const pageIndex = Math.ceil((index + 1) / subtitlesPerPage);
  if (pageIndex !== currentPage.value) {
    currentPage.value = pageIndex;
  }
};

const playOrPause = () => {
  if (isPlaying.value) audioPlayer.value.pause();
  else audioPlayer.value.play();
  isPlaying.value = !isPlaying.value;
};

const rewind = () => { audioPlayer.value.currentTime -= 5; };
const fastForward = () => { audioPlayer.value.currentTime += 5; };
const setPlaybackRate = () => { audioPlayer.value.playbackRate = playbackRate.value; };

const seekToSubtitle = (index) => {
  if (index >= 0 && index < subtitles.value.length) {
    audioPlayer.value.currentTime = subtitles.value[index].start;
    audioPlayer.value.play();
    isPlaying.value = true;
    currentSubtitleIndex.value = index;
    updateCurrentPageForSubtitle(index);
  }
};
const router = useRouter();
const goBack = () => {
  router.go(-1);
};

const onPageChange = (newPage) => { currentPage.value = newPage; };
const isActive = (index) => index === currentSubtitleIndex.value;
const isPlaying = ref(false);
const playbackRate = ref(1.0);
</script>

<style scoped>
.goback-img{
  width: 45px;
  height:40px;
  margin-top:20px;
  margin-left:20px;
}
.subtitle-player {
  margin:10px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  resize: none;

  background-color:rgba(60, 67, 75, 0.66);
  color:white;
  border-radius: 10px;
  border:none;
  padding:10px 10px 10px 10px;
  backdrop-filter: blur(5px);
  border-bottom: 0.5px solid rgba(255,255,255,0.3);
  border-right: 0.5px solid rgba(255,255,255,0.3);
  box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08),
  6px 6px 16px 0 rgba(255, 255, 255, 0.14), 3px 3px 6px -4px rgba(255, 255, 255, 0.08);
}

.subtitles-list {
  display: flex;
  width: 90%;
  height:470px;
  justify-content: space-between;
  gap: 40px;
  margin-top: 20px;
}

.column {
  width: 50%;
}

.subtitle-item {
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.active {
  background-color: #25AEBF;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* 黑色阴影 */
}
::v-deep .el-pagination{
  gap:20px;
}
/* 修改选中页码的颜色 */
::v-deep(.el-pager .number.is-active),
::v-deep(.el-pager .number:hover) {
  color: #25AEBF !important; /* 设置选中页码的字体颜色 */
  font-weight: bold; /* 可选，增加加粗效果 */
  margin: 0 10x; /* 页码间距 10px */
}
/* 设置页码之间的间隔 */
::v-deep(.el-pager .number) {
  margin: 0 2px; /* 页码间距 10px */
}

.pagination{
  margin-top:15px;
  margin-bottom:15px;
}

.audio-controls {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  .playsound-btn{
    width: 30px;
    height:30px;
    margin:0 10px;
  }
  .playsound-img{
    width: 20px;
    height:20px;
  }
  .playsound-img1{
    transform: scaleX(-1); /* 垂直翻转 */
    width: 20px;
    height:20px;
  }
  button{
    background-color: #25AEBF;
    border-radius: 5px;
    border:none;
    color:white;
    width:70px;
    height:30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .slider-container{
    gap:15px;
    margin-left:20px;
    width:400px;
    display: flex;
    align-items: center;
    justify-content: center;
    .custom-slider{
      -webkit-appearance: none;
      width:50%;
      border-radius: 20px;
      outline: none;
      transition: 0.2s;
      position: relative;
      background-image: linear-gradient(to right, #e8e9e9, #25AEBF);
    }
    /* 自定义滑块（thumb） */
    .custom-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px;
      height: 15px;
      background: white; /* 滑块设为白色 */
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid #1d94a4;
    }
  }
}

</style>
