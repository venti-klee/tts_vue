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
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
const words = ref([
  { word: 'The truly humorous individual is often the focus of attention in any gathering.', audioUrl: '/static/audios/newaudio2.wav', meaning: '一个真正有幽默感的人在任何聚会上常常是注意力的核心。', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'Puns require more subtle and sophisticated language skills than other humor forms.', audioUrl: '/static/audios/newaudio2.wav', meaning: '双关语与其他幽默形式相较需要更细微、更巧妙的语言技能。', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'This is a world which is safe and predictable until a murder shatters people’s lives. ', audioUrl: '/static/audios/newaudio2.wav', meaning: '在一场谋杀案打乱了人们的生活之前，这是一个安宁、可预测的世界。', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'There seems no doubt that music will continue to exert its attraction.', audioUrl: '/static/audios/newaudio2.wav', meaning: '毫无疑问，音乐会继续发挥它的诱惑力。', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'Because I was a teenager then, his words couldn’t have been more inspiring.', audioUrl: '/static/audios/newaudio2.wav', meaning: '因为那时我是个十几岁的小伙子，所以他的话最鼓舞人心了。', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
  { word: 'Whenever I doubted I had the right stuff to be a writer，I would reread his note.', audioUrl: '/static/audios/newaudio2.wav', meaning: '每当我怀疑自己不是看成家的料时，便会重温他的便笺。', score: null, isRecording: false, recordingUrl: '',isPlaying:false, },
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
  height:470px;
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
    height:90px;
    text-align: center;
    .audio-control {
      margin: 10px 0;
      display:flex;
      
      gap:10px;
      font-size:14px;
      .btn-img{
        width:23px;
        height:23px;
      }
    }
    .meaning{
      color:#D7D7D7;
      font-size:14px;
      display:flex;
      /* text-align: left; 文字从左到右排列 */
      align-items: center;
      justify-content: center;
      padding-right:40px;
    }
  }

}

</style>