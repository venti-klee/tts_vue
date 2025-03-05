<template>
  <div class="subtitle-player">
    <!-- 字幕分页显示 -->
    <div class="subtitles-list">
      <div
          v-for="(subtitle, index) in paginatedSubtitles"
          :key="index"
          class="subtitle-item"
          :class="{ active: isActive(index) }"
          @click="seekToSubtitle(((currentPage - 1) * subtitlesPerPage) + index)"
      >
        {{ subtitle.text }}
      </div>
    </div>

    <!-- 分页控件 -->
    <el-pagination
        layout="prev, pager, next"
        :total="totalItems"
        :page-size="subtitlesPerPage"
        v-model:current-page="currentPage"
        @current-change="onPageChange"
    ></el-pagination>

    <!-- 音频控制组件 -->
    <div class="audio-controls">
      <button @click="rewind">« Rewind</button>
      <button @click="playOrPause">{{ isPlaying ? 'Pause' : 'Play' }}</button>
      <button @click="fastForward">Fast Forward »</button>
      <input type="range" min="0.5" max="2" step="0.1" v-model="playbackRate" @change="setPlaybackRate">
      <span>Speed: x{{ playbackRate }}</span>
    </div>

    <!-- 音频播放器 -->
    <audio ref="audioPlayer" @timeupdate="handleTimeUpdate" @ended="handleEnded">
      <source :src="audioSrc" type="audio/wav" />
    </audio>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import {ref, onMounted, computed, watch} from 'vue';
import parseSrt from 'parse-srt';

// 定义音频和字幕文件路径，假设文件位于 public 文件夹内
const audioSrc = '/static/讲稿1_cosy_声音样本1.wav'; // 确保此路径指向 public 文件夹内的文件
const srtSrc = '/static/讲稿1_cosy_声音样本1.srt';   // 同上

// 音频播放器引用
const audioPlayer = ref(null);

// 字幕数据
const subtitles = ref([]);

// 当前字幕索引
const currentSubtitleIndex = ref(0);

// 当前播放时间
const currentTime = ref(0);

// 当前页码
const currentPage = ref(1);

// 每页显示字幕数量
const subtitlesPerPage = 15;

// 总项数
const totalItems = computed(() => subtitles.value.length);

// 分页后的字幕数据
const paginatedSubtitles = computed(() => {
  const start = (currentPage.value - 1) * subtitlesPerPage;
  const end = start + subtitlesPerPage;
  return subtitles.value.slice(start, end);
});

// 加载字幕文件
onMounted(async () => {
  try {
    const response = await fetch(srtSrc);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    subtitles.value = parseSrt(text);
  } catch (error) {
    console.error('Failed to fetch or parse subtitles:', error);
  }
});

// 处理音频播放更新事件
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

// 更新当前页以确保指定字幕项可见
const updateCurrentPageForSubtitle = (index) => {
  const pageIndex = Math.ceil((index + 1) / subtitlesPerPage);
  if (pageIndex !== currentPage.value) {
    currentPage.value = pageIndex;
  }
};

// 处理音频播放结束事件
const handleEnded = () => {
  currentSubtitleIndex.value = subtitles.value.length - 1;
  updateCurrentPageForSubtitle(subtitles.value.length - 1);
};

// 播放或暂停音频
const playOrPause = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

// 快退功能
const rewind = () => {
  audioPlayer.value.currentTime -= 5; // 快退5秒
};

// 快进功能
const fastForward = () => {
  audioPlayer.value.currentTime += 5; // 快进5秒
};

// 设置倍速播放
const setPlaybackRate = () => {
  audioPlayer.value.playbackRate = playbackRate.value;
};

// 跳转到特定字幕并播放
const seekToSubtitle = (index) => {
  if (index >= 0 && index < subtitles.value.length) {
    const subtitle = subtitles.value[index];
    audioPlayer.value.currentTime = subtitle.start;
    audioPlayer.value.play();
    isPlaying.value = true;
    currentSubtitleIndex.value = index;
    updateCurrentPageForSubtitle(index);
  }
};

// 分页变化时触发
const onPageChange = (newPage) => {
  currentPage.value = newPage;
};

// 判断是否应该高亮某个字幕项
const isActive = (index) => {
  const globalIndex = (currentPage.value - 1) * subtitlesPerPage + index;
  return globalIndex === currentSubtitleIndex.value;
};

const isPlaying = ref(false);
const playbackRate = ref(1.0); // 倍速播放速率，默认为1.0
</script>

<style scoped>
.subtitle-player {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subtitles-list {
  width: 300px; /* Adjust as needed */
  overflow-y: auto;
  margin-top: 20px;
}

.subtitle-item {
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.active {
  background-color: #f0f0f0f0;
}

.audio-controls {
  margin-top: 20px;
}
</style>