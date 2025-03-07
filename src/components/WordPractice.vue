<template>
  <div class="word-practice">
    <div class="word-card" v-for="(word, index) in words" :key="index">
      <h3>{{ word.word }}</h3>
      <div class="audio-control">
        <el-button icon="el-icon-music" @click="playAudio(word.audioUrl)">发音</el-button>
        <el-button icon="el-icon-record" @click="toggleRecording(index)" :type="word.isRecording ? 'danger' : 'primary'">
          {{ word.isRecording ? '停止' : '录音' }}
        </el-button>
      </div>
      <p class="meaning">{{ word.meaning }}</p>
      <div class="score" v-if="word.score !== null">
        评分: {{ word.score }}
<!--        <el-rate :value="Math.floor(word.score)" disabled></el-rate>-->
      </div>
<!--      <audio controls v-if="word.recordingUrl" :src="word.recordingUrl"></audio>-->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const words = ref([
  { word: 'abandon', audioUrl: '/static/audios/newaudio2.wav', meaning: 'vt. 放弃(信念); 遗弃，抛弃; 离开; 停止(支持或帮助); 中止; 陷入\nn. 放任; 放纵', score: null, isRecording: false, recordingUrl: '' },
  { word: 'example', audioUrl: '/static/audios/newaudio2.wav', meaning: 'n. 例子，实例；v. 举例', score: null, isRecording: false, recordingUrl: '' },
  { word: 'word', audioUrl: '//static/audios/newaudio2.wav', meaning: 'n. 单词，字；言论，话语；消息', score: null, isRecording: false, recordingUrl: '' },
]);

const playAudio = (url) => {
  // 播放音频逻辑
  console.log(`Playing audio: ${url}`);
};

const toggleRecording = (index) => {
  const word = words.value[index];
  if (word.isRecording) {
    stopRecording(index);
  } else {
    startRecording(index);
  }
};

const startRecording = async (index) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    const word = words.value[index];
    word.isRecording = true;

    recorder.ondataavailable = event => {
      chunks.push(event.data);
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      word.recordingUrl = audioUrl;
      word.isRecording = false;
      chunks.length = 0;
      simulateScoring(index);
    };

    recorder.start();
    word.recorder = recorder;
  } catch (error) {
    console.error('Error accessing media devices.', error);
  }
};

const stopRecording = (index) => {
  const recorder = words.value[index].recorder;
  if (recorder) {
    recorder.stop();
  }
};

const simulateScoring1 = () => {
  const scores = [5.5, 6.5, 7.5, 8.5, 9.5];
  return scores[Math.floor(Math.random() * scores.length)];
};

const simulateScoring = (index) => {
  const score = simulateScoring1();
  words.value[index].score = score;
  ElMessage({
    message: `录音完成，您的得分是: ${score}`,
    type: 'success',
  });
};
</script>

<style scoped>
.word-practice {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.word-card {
  border: 1px solid #ccc;
  padding: 20px;
  width: 200px;
  text-align: center;
}

.audio-control {
  margin: 10px 0;
}

.score {
  margin-top: 10px;
  color: #409eff;
}

.el-rate {
  margin-left: 10px;
}
</style>