<template>
<div class="audio-settings-container">
  <p class="title">音频设置</p>
  <div class="audio-settings">
    <el-form class="form">
      <div class="set-item" label="语言">
        <p class="set-name">语言</p>
        <el-select class="select-container" v-model="audioSettings.language" placeholder="选择语言" @change="handleLanguageChange">
          <el-option
              v-for="language in languages"
              :key="language.value"
              :value="language.value"
          >{{ language.label }}</el-option>
        </el-select>
        <p class="tip">*可选择的语言包含标准语言和地方方言</p>
      </div>

      <div class="set-item">
        <p class="set-name">情感</p>
        <el-select class="select-container" v-model="audioSettings.emotion" placeholder="选择情感">
          <el-option
              v-for="emotion in emotions"
              :key="emotion.value"
              :value="emotion.value"
          >{{ emotion.label }}</el-option>
        </el-select>
        <p class="tip">*不同的情感会影响音频的节奏、语调等</p>
      </div>

      <div class="set-item">
        <p class="set-name">音调</p>
        <el-select class="select-container" v-model="audioSettings.pitch" placeholder="选择音调">
          <el-option
              v-for="pitch in pitches"
              :key="pitch.value"
              :value="pitch.value"
          >{{ pitch.label }}</el-option>
        </el-select>
      </div>

      <div class="set-item">
        <p class="set-name">风格</p>
        <el-select class="select-container" v-model="audioSettings.style" placeholder="选择风格">
          <el-option
              v-for="style in styles"
              :key="style.value"
              :value="style.value"
          >{{ style.label }}</el-option>
        </el-select>
        <p class="tip">*语言风格控制音频的语气、腔调等</p>
      </div>

      <div class="set-item">
        <p class="set-name">字幕</p>
        <el-select class="select-container" v-model="audioSettings.subtitle" placeholder="关闭">
          <el-option
              v-for="subtitle in subtitles"
              :key="subtitle.value"
              :value="subtitle.value"
          >{{ subtitle.label }}</el-option>
        </el-select>
      </div>

      <div class="set-item">
        <p class="set-name">语速</p>
        <el-slider
            v-model="audioSettings.speed"
            :min="0.5"
            :max="2"
            :step="0.1"
            show-stops
            :marks="speedMarks"
        ></el-slider>
        <!--        <el-slider v-model="audioSettings.speed" :min="0.1" :max="2" :step="0.1"></el-slider>-->
      </div>

      <div class="set-item">
        <p class="set-name">停顿</p>
        <el-slider 
          v-model="audioSettings.pause" 
          :min="0" 
          :max="2" 
          :step="0.1"
          show-stops
          :marks="pauseMarks"></el-slider>
      </div>

      <div class="set-item">
        <p class="set-name">音量</p>
        <el-slider 
          v-model="audioSettings.volume" 
          :min="0" 
          :max="2" 
          :step="0.1"
          show-stops
          :marks="volumeMarks"></el-slider>
      </div>
    </el-form>
  </div>
  
</div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue';
import eventBus from '../eventBus.js'; // 引入事件总线
const emit = defineEmits(['update:audio-settings']);
// 定义速度标记
const speedMarks = {
  0.5: '慢速',
  1: '正常',
  2: '快速'
};
const pauseMarks = {
  0: '极速',
  1: '正常',
  2: '缓慢'
};
// const volumeMarks = {
//   0: '小声',
//   1: '正常',
//   2: '大声'
// };
const subtitles = ref([
  { value: '关闭', label: '关闭' },
  { value: '简体中文', label: '简体中文' },
  { value: '英语', label: '英语' },
  { value: '日语', label: '日语' },
  { value: '韩语', label: '韩语' }
]);
const languages = ref([
  { value: '简体中文', label: '中文' },
  { value: '英语', label: '英语' },
  { value: '日语', label: '日语' },
  { value: '韩语', label: '韩语' }
]);
const emotions = ref([
  { value: 'happy', label: '快乐' },
  { value: 'sad', label: '悲伤' },
  { value: 'angry', label: '愤怒' },
  { value: 'fear', label: '恐惧' },
  { value: 'surprise', label: '惊讶' },
  { value: 'disgust', label: '厌恶' },
  { value: 'neutral', label: '中性' },
  // 其他情感选项...
]);
const pitches = ref([
  { value: 'normal', label: '普通' },
  { value: 'low', label: '低' },
  { value: 'verylow', label: '很低' },
  { value: 'high', label: '高' },
  { value: 'veryhigh', label: '很高' },

  // 其他音调选项...
]);
const styles = ref([
  { value: 'soft', label: '抒情' },
  { value: 'formal', label: '正式' },
  { value: 'professional', label: '专业' },
  { value: 'conversational', label: '聊天' },
  { value: 'humorous', label: '幽默' },
  { value: 'technical', label: '技术讲解' },
  { value: 'warn', label: '温暖亲切' },
  { value: 'dramatic', label: '戏剧性' },
  // 其他风格选项...
]);

const audioSettings = ref({
  language: '',
  emotion: '',
  pitch: '',
  style: '',
  subtitle: '',
  speed: 1,
  pause: 0.5,
  volume: 1,
});
const handleLanguageChange = (lang) => {
  eventBus.setLanguage(lang); // 通过事件总线发送语言变化
  emit('update:audio-settings', { ...audioSettings.value });
};
const updateAudioSettings = () => {
  console.log('Emitting audio settings:', { ...audioSettings.value });
  emit('update:audio-settings', { ...audioSettings.value });
};

// 监听变化并更新
watch(audioSettings, () => {
  updateAudioSettings();
}, { deep: true });
</script>

<style scoped>
.audio-settings-container{
  .title{
    background-color:transparent;
    color:#767A7D;
    font-size:18px;
    margin-left:20px;
  }
  .form{
    margin-top:-50px;
    margin-left:20px;
  }
}
.audio-settings {
  padding: 0px;
  margin-top: 10px;
  resize: none;
  width: 100%;
  background-color: rgba(60, 67, 75, 0.66);
  backdrop-filter: blur(5px);
  color:white;
  border-radius: 10px;
  border:none;
  padding:70px 10px 10px 10px;
  flex-direction: column; /* 纵向排列 */
  gap: 10px; /* 控制表单项间距 */
  border-top: 0.5px solid rgba(255,255,255,0.3);
  border-left: 0.5px solid rgba(255,255,255,0.3);
  box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);
  .set-item{
    position:relative;
    margin-bottom:23px;
    display: flex;
    align-items: center;
    .set-name{
      color:white;
      font-size:16px;
      display:flex;
      align-items:center;
      width: 40px;
      
    }
    .tip{
      position: absolute;
      font-size:14px;
      color:#767A7D;
      right:5px;
    }

  }
  
  .select-container{
    width: 150px !important; /* 统一下拉框宽度 */
    margin-left:20px;
    background-color:transparent;
  }
  .el-select-dropdown {
    background-color: white !important; /* 让下拉列表背景保持白色 */
  }
  .el-select__wrapper el-tooltip__trigger el-tooltip__trigger {
    background-color: transparent !important; /* 让输入框背景透明 */
    border: 1px solid #ccc; /* 可选，保持边框 */
    color: #fff; /* 文字颜色，确保可读 */
  }
  .el-slider{
    width: 300px !important; /* 统一滑块宽度 */
    margin-left:20px;
  }
  :deep(.el-slider__bar) {
    background-color: #25AEBF !important; /* 滑过部分 */
  }

  :deep(.el-slider__runway) {
    background-color: #E2E2E3 !important; /* 未滑过部分 */
  }
}

</style>