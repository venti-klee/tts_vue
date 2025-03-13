<template>
  <div class="word-practice">
    <div class="word-card" v-for="(word, index) in words" :key="index">
      <div class="audio-control">
        <p>{{ word.word }}</p>
        <img 
          class="btn-img" 
          :src="word.isPlaying ? '/static/小喇叭1.png' : '/static/小喇叭.png'"
          @click="playAudio(word)" 
          alt="pic">
        <img class="btn-img" 
          :src="word.isRecording ? '/static/麦克风.png' : '/static/麦克风1.png'" 
          @click="toggleRecording(index)"  
          alt="pic">
          <div class="score" v-if="word.score !== null" :style="{ color: getScoreColor(word.score) }">
            {{ word.score }}
          </div>
      </div>
      <p class="meaning" v-html="word.meaning"></p>
    </div>
  </div>
</template>

<script setup>
import { ref,defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
const recordCount = ref(0);
const emit = defineEmits(['recording-complete']); // 声明事件
const words = ref([
  { word: 'adversely', audioUrl: '/static/发音练习/8.wav', meaning: 'adv.不利地；反而', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'assurance', audioUrl: '/static/发音练习/9.wav', meaning: 'n.保证；担保；自信；人寿保险', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'circulate', audioUrl: '/static/发音练习/10.wav', meaning: 'v.循环；(液体或气体)环流；传播；传阅；散布；往来应酬，周旋', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'concept', audioUrl: '/static/发音练习/11.wav', meaning: 'n.概念；观念，思想；发明，创造', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'constant', audioUrl: '/static/发音练习/12.wav', meaning: 'n.常数；常量<br>adj.恒定的；不断的；不变的；固定的；重复的；连续发生的', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'contrast', audioUrl: '/static/发音练习/13.wav', meaning: 'n.对比；对照；反差；明显不同的人(或事物)<br>v.对比；对照；形成对比', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'converse', audioUrl: '/static/发音练习/14.wav', meaning: 'vi.交谈；谈话<br>n.相反的事物；(事实或陈述的)反面<br>adj.相反的，逆的，颠倒的', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'criticism', audioUrl: '/static/发音练习/15.wav', meaning: 'n.批评；批判；(尤指对书、音乐等的)评论文章，评论；指责；责备', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'detrimental', audioUrl: '/static/发音练习/16.wav', meaning: 'adj.有害的，不利的<br>n.有害的人(或物)；不利条件', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'dwell', audioUrl: '/static/发音练习/17.wav', meaning: 'vi.居住；栖身', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
]);

const playAudio = (word) => {
  console.log(`Playing audio: ${word.audioUrl}`);
  // 先把所有单词的 isPlaying 设为 false（防止多个播放）
  words.value.forEach(w => w.isPlaying = false);
  
  // 设置当前播放的单词 isPlaying 为 true
  word.isPlaying = true;

  const audio = new Audio(word.audioUrl);
  audio.play();

  audio.onended = () => {
    word.isPlaying = false; // 播放结束恢复图标
  };
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

      // 录音次数 +1
      recordCount.value++;

      // 录音达到 5 次时，向上触发事件
      if (recordCount.value >= 5) {
        eventBus.emit("recording-complete");  // 发送事件
      }

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
  return (Math.random() * 5 + 5).toFixed(1); // 生成 5.0 ~ 10.0 之间的随机数，并保留 1 位小数
};

const getScoreColor = (score) => {
  if (score >= 8.0 && score <= 10.0) {
    return "#F65312"; // 红色
  } else if (score >= 6.0 && score <= 7.9) {
    return "#FA862B"; // 橙色
  } else if (score >= 5.0 && score <= 5.9) {
    return "#25AEBF"; // 蓝色
  }
  return "#ffffff"; // 默认颜色
};

const simulateScoring = (index) => {
  const score = simulateScoring1();
  words.value[index].score = score;
  ElMessage({
    message: `跟练完成，您的得分是: ${score}`,
    type: 'success',
  });
};
</script>

<style scoped>
.word-practice {
  height:500px;
  margin-top:20px;
  color:white;
  border-radius: 10px;
  border:none;
  padding:10px 10px 10px 10px;
  backdrop-filter: blur(5px);
  background-color:rgba(60, 67, 75, 0.66);
  border-top: 0.5px solid rgba(255,255,255,0.3);
  border-left: 0.5px solid rgba(255,255,255,0.3);
  box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);
  display: flex;
  flex-wrap: wrap;
  padding:10px 20px;
  gap:15px 0px;
  overflow-y: auto;
  .word-card {
    border: none;
    padding: 10px;
    width: 45%;
    height:90px;
    text-align: center;
    .audio-control {
      margin: 10px 0;
      display:flex;
      align-items: center;
      gap:10px;
      .btn-img{
        width:23px;
        height:23px;
      }
    }
    .meaning{
      color:#D7D7D7;
      font-size:14px;
      display:flex;
      text-align: left; /* 文字从左到右排列 */
    }
  }

}

</style>