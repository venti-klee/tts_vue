<template>
  <div class="audio-settings">
    <el-form>
      <el-form-item label="语言">
        <el-select v-model="audioSettings.language" placeholder="选择语言">
          <el-option
              v-for="language in languages"
              :key="language.value"
              :value="language.value"
          >{{ language.label }}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="情感">
        <el-select v-model="audioSettings.emotion" placeholder="选择情感">
          <el-option
              v-for="emotion in emotions"
              :key="emotion.value"
              :value="emotion.value"
          >{{ emotion.label }}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="音调">
        <el-select v-model="audioSettings.pitch" placeholder="选择音调">
          <el-option
              v-for="pitch in pitches"
              :key="pitch.value"
              :value="pitch.value"
          >{{ pitch.label }}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="语言风格">
        <el-select v-model="audioSettings.style" placeholder="选择风格">
          <el-option
              v-for="style in styles"
              :key="style.value"
              :value="style.value"
          >{{ style.label }}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="字幕">
        <el-select v-model="audioSettings.subtitle" placeholder="选择字幕">
          <el-option label="开启" value="true"></el-option>
          <el-option label="关闭" value="false"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="速度">
        <el-slider
            v-model="audioSettings.speed"
            :min="0"
            :max="2"
            :step="1"
            show-stops
            :marks="speedMarks"
        ></el-slider>
<!--        <el-slider v-model="audioSettings.speed" :min="0.1" :max="2" :step="0.1"></el-slider>-->
      </el-form-item>

      <el-form-item label="停顿">
        <el-slider v-model="audioSettings.pause" :min="0" :max="2" :step="0.1"></el-slider>
      </el-form-item>

      <el-form-item label="饱满度">
        <el-slider v-model="audioSettings.volume" :min="0" :max="2" :step="0.1"></el-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue';

const emit = defineEmits(['update:audio-settings']);
// 定义速度标记
const speedMarks = {
  0: '慢速',
  1: '正常',
  2: '快速'
};

const languages = ref([
  { value: 'zh-CN', label: '中文' },
  // 其他语言选项...
]);
const emotions = ref([
  { value: 'happy', label: '快乐' },
  // 其他情感选项...
]);
const pitches = ref([
  { value: 'normal', label: '普通' },
  // 其他音调选项...
]);
const styles = ref([
  { value: 'soft', label: '柔和' },
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
.audio-settings {
  padding: 20px;
}
</style>