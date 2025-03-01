<script setup>

import TxtContainer from "@/components/TxtContainer.vue";
import { ref } from "vue";
const receivedText = ref(""); // 用于存储从子组件接收到的文本内容

// 处理子组件传递的文本内容
const handleTextContent = (content) => {
  receivedText.value = content;
};
</script>

<template>
<div>
    <el-row>
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
      <txt-container @update:textContent="handleTextContent"></txt-container>
      </el-col>
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" style="background-color: #1D94A4;width: 100%;">
          <div style="background-color: #1D94A4;width: 100%;">
            csdiajkzbcjzbczcbzbhhjj
          </div>
        </el-col>
    </el-row>
  音频输出
  测试传参
  <div class="parent-container">
    <div>
      <h3>父组件接收到的文本内容：</h3>
      <pre>{{ receivedText }}</pre>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>