<script setup>

import TxtContainer from "@/components/TxtContainer.vue";
import { ref } from "vue";
import VoiceSelector from "@/components/VoiceSelector.vue";
import SoundAdjust from "@/components/SoundAdjust.vue";
import AduioShow from "@/components/AduioShow.vue";

const receivedText = ref(""); // 用于存储从子组件接收到的文本内容
const audioSettings = ref({});

const handleAudioSettings = (settings) => {
  audioSettings.value = settings;
};
// 处理子组件传递的文本内容
const handleTextContent = (content) => {
  receivedText.value = content;
};
const selectedVoice = ref(null);

const handleVoiceSelect = (selectedVoiceData) => {
  console.log('Selected Voice:', selectedVoiceData);
  selectedVoice.value = selectedVoiceData;
  // 在这里处理选中的声音样本
};
</script>

<template>
<div>
  <el-row>
    <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
      <!--文本-->
      <el-row>
        <txt-container  class="custom-text-container" @update:textContent="handleTextContent"></txt-container>
      </el-row>

      <!--声音样本-->
      <el-row>
        <voice-selector @select-voice="handleVoiceSelect"></voice-selector>
      </el-row>
    </el-col>
    <!--音频设置-->
    <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" >
      <div>
        <sound-adjust @update:audio-settings="handleAudioSettings"></sound-adjust>
      </div>
      <!-- <div>
      <h3>音频设置参数：</h3>
      <pre>{{ audioSettings }}</pre>
    </div> -->
    </el-col>
  </el-row>

  <!--音频输出-->
  <el-row>
    <aduio-show></aduio-show>
  </el-row>
<!--  音频输出-->
<!--  测试传参-->
<!--  <div class="parent-container">-->
<!--    <div>-->
<!--      <h3>父组件接收到的文本内容：</h3>-->
<!--      <pre>{{ receivedText }}</pre>-->
<!--      <p>已选择的声音样本: {{ selectedVoice ? selectedVoice.name : '无' }}</p>-->

<!--    </div>-->
<!--  </div>-->
</div>
</template>

<style scoped>
  .custom-text-container{
    boder: 1px solid red;
  }

</style>