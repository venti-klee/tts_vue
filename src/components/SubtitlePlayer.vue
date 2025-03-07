<template>
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
import { ref, computed, onMounted, watch } from 'vue';
import parseSrt from 'parse-srt';

const audioSrc = '/static/sft_output_长文本.wav';
const srtSrc = '/static/sft_output_长文本.srt';
const audioPlayer = ref(null);
const subtitles = ref([]);
const currentSubtitleIndex = ref(0);
const currentTime = ref(0);
const currentPage = ref(1);
const subtitlesPerPage = 6;

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

const onPageChange = (newPage) => { currentPage.value = newPage; };
const isActive = (index) => index === currentSubtitleIndex.value;
const isPlaying = ref(false);
const playbackRate = ref(1.0);
</script>

<style scoped>
.subtitle-player {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subtitles-list {
  display: flex;
  width: 600px;
  justify-content: space-between;
  gap: 20px;
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
}

.audio-controls {
  margin-top: 20px;
}
</style>
