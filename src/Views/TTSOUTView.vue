<script setup>

import TxtContainer from "@/components/TxtContainer.vue";
import { ref } from "vue";
import VoiceSelector from "@/components/VoiceSelector.vue";
import SoundAdjust from "@/components/SoundAdjust.vue";
import AduioShow from "@/components/AduioShow.vue";

const receivedText = ref(""); // 用于存储从子组件接收到的文本内容
const audioSettings = ref({});
const audioSrc = ref(""); // 默认不显示音频

const generateAudio = () => {
  audioSrc.value = "/static/audio1.wav"; // 点击按钮后赋值音频路径
};
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
        <voice-selector class="voice-select-container" @select-voice="handleVoiceSelect"></voice-selector>
      </el-row>
    </el-col>

    <!--音频设置-->
    <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" >
      <div>
        <sound-adjust class="sound-adjust-cotainer" @update:audio-settings="handleAudioSettings"></sound-adjust>
        <button class="btn1" @click="generateAudio">生成音频</button>
      </div>

    </el-col>
  </el-row>

  <!--音频输出-->
  <el-row  class="audio-show">
    <aduio-show :src="audioSrc"></aduio-show>
  </el-row>
</div>
</template>

<style scoped>
  .custom-text-container{
    margin-left:40px;
    width:680px;
    margin-top:15px;
  }
  .voice-select-container{
    margin-left:40px;
    width:680px;
    margin-top:-70px;
    height:220px;
  }
  .sound-adjust-cotainer{
    /* margin-right:60px; */
    margin-left:-10px;
    width:91%;
    margin-top:20px;
  }
  .audio-show{
    margin-top:40px;
    margin-left:40px;
  }
  .btn1{
    margin-left:-10px;
    width: 510px;
    height:40px;
    margin-top:20px;
    background-color: #25AEBF;
    color:white;
    border-radius: 10px;
    border:none;
  }
  .btn1:hover{
    background-color: #1D94A4;
  }

</style>