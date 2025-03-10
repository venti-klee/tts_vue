<template>
  <div v-if="selectedQuestion" class="question-express">
    <!-- 错题详情展示 -->
    <h3>选中的问题详情</h3>
    <p><strong>问题:</strong> {{ selectedQuestion.text }}</p>
    <p><strong>答案:</strong> {{ selectedQuestion.answer }}</p>
    <img :src="selectedQuestion.imgurl" alt="题目图片" style="max-width: 100%; height: auto;"/>

    <!-- 模拟大模型对话界面 -->
    <div class="chat-container">
      <div class="messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index"
             :class="['message', {'user-message': message.user, 'bot-message': !message.user}]">
          <div class="message-content" :ref="el => { if (el) messageRefs[index] = el }">{{ message.content }}</div>
        </div>
      </div>
      <div class="input-area">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入您的问题..."
            v-model="newMessage"
            @keyup.enter="sendMessage"> <!-- 移除了 .native 修饰符 -->
        </el-input>
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>请选择一个问题</p>
  </div>
</template>

<script>
export default {
  props: ['selectedQuestion'],
  data() {
    return {
      explanationsMap: {
        "错题1(1).jpg": `
    这道题目要求找出计算错误的选项。我们来逐个分析每个选项：
    A. $$3x^{-2} = \\frac{1}{3x^2}$$ 是错误的。
    B. $$(-1)^{-1} = -1$$ 是正确的。
    C. $$(-2)^{-2} = \\frac{1}{4}$$ 是正确的。
    D. $$(-x)^{-3} = -\\frac{1}{x^3}$$ 是正确的。
    所以，计算错误的选项是 A。
  `,
        "错题1(2).jpg": `
          首先，我们来分析题目中的数学表达式：
          $$4 \\times 2^5 \\div 32 \\times (-2)^6$$
          计算 $$2^5$$ 和 $$(-2)^6$$：
          $$2^5 = 32$$
          $$(-2)^6 = 64$$（因为负数的偶数次幂结果为正数）
          将这些值代入原始表达式：
          $$4 \\times 32 \\div 32 \\times 64 = 256$$
          所以，表达式的结果是 256。
        `,
      },
      messages: [],
      newMessage: '',
      initialMessageAdded: false,
      messageRefs: {} // 用于存储每个消息元素的引用
    };
  },
  computed: {
    explanation() {
      if (!this.selectedQuestion || !this.selectedQuestion.imgurl) return null;

      const fileName = this.selectedQuestion.imgurl.split('/').pop();
      return this.explanationsMap[fileName] || null;
    }
  },
  watch: {
    selectedQuestion(newVal) {
      if (newVal) {
        this.messages = []; // 清空现有消息
        this.addInitialMessage(); // 添加新问题的初始消息
      }
    }
  },
  mounted() {
    // 确保页面加载完成后等待MathJax加载完毕再进行初次渲染
    window.MathJax && window.MathJax.typesetPromise().then(() => {
      if (this.explanation) {
        this.addInitialMessage();
      }
    });
  },
  methods: {
    addInitialMessage() {
      if (this.explanation) {
        this.messages.push({ user: false, content: this.explanation }); // 添加解释作为第一条消息
        this.$nextTick(() => {
          this.renderMathJax();
          this.scrollToBottom();
        });
      }
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        // 用户消息
        this.addMessage('user', this.newMessage);
        this.newMessage = '';

        // 模拟大模型回复
        setTimeout(() => {
          this.addMessage('bot', '思考中，请稍后');
        }, 500); // 模拟延迟
      }
    },
    addMessage(type, content) {
      this.messages.push({user: type === 'user', content});
      this.$nextTick(() => {
        this.renderMathJax();
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      container.scrollTop = container.scrollHeight;
    },
    renderMathJax() {
      if (window.MathJax) {
        Object.values(this.messageRefs).forEach(element => {
          window.MathJax.typesetPromise([element]);
        });
      }
    }
  }
};
</script>

<style scoped>
.question-express {
  display: flex;
  flex-direction: column;
}

.chat-container {
  border-top: 1px solid #ebeef5;
  margin-top: 20px;
  padding-top: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
  max-width: 80%;
  box-sizing: border-box;
}

.user-message {
  background-color: #4e8791;
  align-self: flex-end;
  margin-right: 10px;
}

.bot-message {
  background-color: #1d94a4;
  align-self: flex-start;
  margin-left: 10px;
}

.input-area {
  display: flex;
  justify-content: space-between;
}
</style>