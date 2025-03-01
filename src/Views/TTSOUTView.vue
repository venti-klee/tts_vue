<script setup>

import TxtContainer from "@/components/TxtContainer.vue";
import { ref } from "vue";
import VoiceSelector from "@/components/VoiceSelector.vue";
const receivedText = ref(""); // 用于存储从子组件接收到的文本内容

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
<!--        文本-->
        <el-row>
          <txt-container @update:textContent="handleTextContent"></txt-container>
        </el-row>
<!--        声音样本-->
      <el-row>
        <voice-selector @select-voice="handleVoiceSelect"></voice-selector>
      </el-row>
      </el-col>
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" style="background-color: #1D94A4;width: 100%;">
          <div style="background-color: #1D94A4;width: 100%;">

          </div>
        </el-col>
    </el-row>
  音频输出
  测试传参
  <div class="parent-container">
    <div>
      <h3>父组件接收到的文本内容：</h3>
      <pre>{{ receivedText }}</pre>
      <p>已选择的声音样本: {{ selectedVoice ? selectedVoice.name : '无' }}</p>

    </div>
  </div>
</div>
</template>

<style scoped>

</style>