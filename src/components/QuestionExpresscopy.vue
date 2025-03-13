<script>
import {onMounted, ref, watch} from 'vue';
import OpenAI from "openai";

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.VUE_APP_DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  dangerouslyAllowBrowser: true
});

export default {
  props: ['selectedQuestion'],
  setup(props) {
    const messages = ref([]); // 存储整个对话历史
    const newMessage = ref(''); // 用户输入的消息
    // eslint-disable-next-line no-unused-vars
    let currentBotMessage='';
    // 监听selectedQuestion变化，当选择新题目时调用handleImageQuestion并清空聊天记录
    watch(() => props.selectedQuestion, async (newVal) => {
      if (newVal && newVal.imgurl) {
        messages.value = []; // 清空现有消息
        await handleImageQuestion(newVal.imgurl);
      }
    }, { immediate: true });

    // 更新机器人消息的方法
    const updateBotMessage = (content) => {
      // 直接更新最后一条消息的内容，避免累积之前的消息
      messages.value[messages.value.length - 1].content += content;
    };

// 用户发送消息函数
    const sendMessage = () => {
      const trimmedMessage = newMessage.value.trim();
      if (trimmedMessage) {
        addMessage({ role: 'user', content: trimmedMessage });
        callTextGenerationApi(trimmedMessage);
        newMessage.value = ''; // 清空输入框
      }
    };

// 调用文本生成API解决用户输入的问题，并实现实时显示回复的效果
    // eslint-disable-next-line no-unused-vars
    const callTextGenerationApi = async (userInput) => {
      try {
        let assistantReplyStarted = false; // 标记是否已经开始接收回复

        const completion = await openai.chat.completions.create({
          model: "qwen-omni-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...messages.value.map(msg => ({
              role: msg.role === 'bot' ? 'assistant' : msg.role,
              content: typeof msg.content === 'string' ? msg.content : ''
            }))
          ],
          stream: true,
          stream_options: {
            include_usage: true
          },
          modalities: ["text"],
        });

        for await (const chunk of completion) {
          if (chunk.choices && chunk.choices.length > 0 && chunk.choices[0].delta && chunk.choices[0].delta.content) {
            if (!assistantReplyStarted) {
              // 第一次接收到内容时，添加一个新的机器人消息条目
              addMessage({ role: 'assistant', content: '' });
              assistantReplyStarted = true;
            }
            // 每次只追加新的内容到当前最后一条消息中
            updateBotMessage(chunk.choices[0].delta.content); // 实时更新UI
          }
        }

        if (!assistantReplyStarted) {
          // 如果没有接收到任何内容，则添加默认消息
          addMessage({ role: 'assistant', content: '我理解您的问题，但没有找到合适的答案。' });
        }
        renderMathJax(); // 更新后重新渲染MathJax
      } catch (error) {
        console.error('Error calling text generation API:', error);
        // eslint-disable-next-line no-undef
        if (!assistantReplyStarted) {
          addMessage({ role: 'assistant', content: '抱歉，无法生成回答。' });
        }
      }
    };

// 处理题目选择事件，上传图片至视觉理解模型接口获取解答
    const handleImageQuestion = async (imageUrl) => {
      let assistantReplyStarted = false; // 标记是否已经开始接收回复

      try {
        let base64Image;
        if (!imageUrl.startsWith('data:image')) {
          base64Image = await fetchToBase64(imageUrl);
        } else {
          base64Image = imageUrl;
        }

        addMessage({ role: 'user', content: "请解答图中的问题" });

        const completion = await openai.chat.completions.create({
          model: "qwen-omni-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: [{ type: "image_url", image_url: { url: base64Image } }, { type: "text", text: "请解答图中的问题" }] }
          ],
          stream: true,
          stream_options: {
            include_usage: true
          },
          modalities: ["text"],
        });

        for await (const chunk of completion) {
          if (Array.isArray(chunk.choices) && chunk.choices.length > 0) {
            const delta = chunk.choices[0].delta;
            if (delta && delta.content) {
              if (!assistantReplyStarted) {
                // 第一次接收到内容时，添加一个新的机器人消息条目
                addMessage({ role: 'assistant', content: '' });
                assistantReplyStarted = true;
              }
              // 每次只追加新的内容到当前最后一条消息中
              updateBotMessage(delta.content); // 实时更新UI
            }
          }
        }

        if (!assistantReplyStarted) {
          // 如果没有接收到任何内容，则添加默认消息
          addMessage({ role: 'assistant', content: '抱歉，未能解析图片中的问题。' });
        }
        renderMathJax();
      } catch (error) {
        console.error('Error uploading image or getting explanation:', error);
        if (!assistantReplyStarted) {
          addMessage({ role: 'assistant', content: '抱歉，无法获取题目解答。' });
        }
      }
    };



    // 将公网URL转换为Base64格式（如果需要）
    const fetchToBase64 = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    // 添加消息到聊天记录中
    const addMessage = (message) => {
      messages.value.push(message);
    };

    // 在组件挂载和消息更新后重新渲染MathJax
    const renderMathJax = () => {
      setTimeout(() => {
        if (window.MathJax) {
          window.MathJax.typesetPromise();
        }
      }, 0);
    };

    onMounted(() => {
      renderMathJax();
    });

    return {
      messages,
      newMessage,
      sendMessage,
    };
  }
};
</script>
<template>
    <div class="title1">问题详解</div>
    <div class="AI-chat">
      <div v-if="selectedQuestion" class="question-express">
        <!-- 错题详情展示 -->
        <div class="up">
          <p>题目：</p>
          <img :src="selectedQuestion.imgurl" alt="题目图片" style="max-width: 100%; height: auto;"/>
          <span v-html="selectedQuestion.text"></span>
          <!-- 模拟大模型对话界面 -->
          <div class="chat-container">
            <div class="messages">
              <div v-for="(message, index) in messages" :key="index"
                  :class="['message', message.role]">
                <div class="message-content">{{ message.content }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="input-area">
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入您的问题..."
              v-model="newMessage"
              @keyup.enter="sendMessage">
          </el-input>
          <img src="/static/发送4.png" @click="sendMessage" alt="pic">
        </div>
      </div>
      <div v-else>
        <p>请选择一道错题</p>
      </div>
    </div>

</template>

<style scoped>
.content{
  width:100%;
  height:100%;
  background-color: none;
  margin-top:20px;
  display:flex;
  flex-direction: column;
}
.title1{
  background-color:transparent;
  color:#767A7D;
  font-size:18px;
  margin-left:-5px;
  margin-top:20px;
  margin-bottom:0px;
}
.AI-chat{
  margin-top:10px;
  resize: none;
  width: 107%;
  height:610px;
  max-width: 680px;
  background-color:rgba(60, 67, 75, 0.66);
  color:white;
  border-radius: 10px;
  border:none;
  padding:20px 30px;
  backdrop-filter: blur(5px);
  border-top: 0.5px solid rgba(255,255,255,0.3);
  border-left: 0.5px solid rgba(255,255,255,0.3);
  box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);
  margin-left:-25px;
  .question-express {
    display: flex;
    flex-direction: column;
    position:relative;
    padding-bottom:0px;
    img{
      margin-top:10px;
      margin-bottom:10px;
    }
    .chat-container {
      border-top: 1px solid #ebeef5;
      margin-top: 20px;
      width:100%;
      overflow-y: auto;
      position:relative;
      .messages {
        overflow-y: auto;
        padding:0 10px 10px 20px;
      } 
    }
  }
}
.up{
  height: 570px !important;
  display: flex;
  flex-direction: column;
}
.input-area {
  display: flex;
  justify-content: space-between;
  position:absolute;
  bottom:-40px;
  width:100%;
  :deep .el-input{
    position: relative;
    height:60px;
    resize: none !important; /* 禁止手动调整大小 */
    overflow-y: auto !important; /* 自动显示竖向滚动条 */
  }
  img{
    width:30px;
    height:30px;
    position: absolute;
    bottom:0px;
    right:10px;
    z-index:999;
  }
}
.message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
  max-width: 100%;
  box-sizing: border-box;
}

/* 用户消息样式 */
.message.user {
  background-color: #25AEBF; 
  align-self: flex-end; /* 对齐到右侧 */
  margin-right: 30px;
  color:white;
}

/* 助手消息样式 */
.message.assistant {
  background-color: #f2969d; /* 浅红色背景 */
  align-self: flex-start; /* 对齐到左侧 */
  margin-left: 30px;
}


</style>