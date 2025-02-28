
<template>
  <div class="body_class">


  <div class="login-page">
    <!-- Header Section -->
    <header>
      <div class="logo">
        <img src='../../src/assets/static/logo6.png' alt="logo" class="img1">
        <img src='../../src/assets/static/title.png' alt="logo" class="img2">
      </div>
      <div v-for="(item, index) in menuItems" :key="index" class="p1">
        <p>{{ item.text }}</p>
        <img :src="item.icon" alt="icon" class="menu-icon">
      </div>
    </header>

    <!-- Content Section -->
    <div class="content">
      <el-form :model="form" ref="loginForm" @submit.prevent="handleLogin" class="form1">
        <div class="btn">
          <el-button type="primary" @click="handleRegister" class="btn1">注册</el-button>
          <el-button type="success" @click="handleLogin" class="btn2">登录</el-button>
        </div>

        <div class="input-group">
          <el-input v-model="form.userid" placeholder="账号"></el-input>
        </div>
        <div class="input-group">
          <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
        </div>
        <el-button type="warning" native-type="submit" class="btn3">登录</el-button>
      </el-form>
      <img src='../../src/assets/static/4.png' alt="image" class="content-img">
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <div v-for="(adv, index) in advantages" :key="index" class="adv">
        <p>{{ adv.text }}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const loginForm = ref(null);
    const form = reactive({
      userid: '',
      password: ''
    });

    const menuItems = [
      { text: '关于我们', icon: require("../../src/assets/static/返回.png") },
      { text: '意见反馈', icon: require("../../src/assets/static/返回.png")  },
      { text: '隐私政策', icon: require("../../src/assets/static/返回.png")  },
      { text: '应用落地', icon: require("../../src/assets/static/返回.png")  },
      { text: '硬件匹配', icon: require("../../src/assets/static/返回.png")  }
    ];

    const advantages = [
      { text: '个性化语音讲解' },
      { text: '标准语言输出' },
      { text: '有声课件制作解' },
      { text: '智能AI助手' }
    ];

    const handleLogin = async () => {
      try {
        const response = await fetch('http://LOCALHOST:4000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const users = await response.json();
        if (users.length > 0) {
          await router.push({name: 'topage1'});
        } else {
          alert('没有找到对应的用户。');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleRegister = () => {
      router.push({ name: 'toregister' });
    };

    return { form, loginForm, menuItems, advantages, handleLogin, handleRegister };
  }
};
</script>

<style scoped>
.body_class {
  background: url('../../src/assets/static/BG.png') no-repeat;
  height: 100vh;
  margin: 0;
}

.login-page header {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  margin-left: 50px;
}

.img1 {
  height: 50px;
  width: 50px;
}

.img2 {
  height: 40px;
  margin-left: 5px;
}

.p1 {
  margin-left: 90px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: white;
}

.menu-icon {
  height: 24px;
  transform: rotate(270deg);
  margin-left: 10px;
}

.content {
  margin-left: 90px;
  margin-right: -50px;
  margin-top: -50px;
  display: flex;
  align-items: center;
}

.form1 {
  background-color: rgba(255, 255, 255, 0.25);
  border: 1px solid white;
  width: 450px;
  height: 300px;
  border-radius: 60px;
  box-shadow: 10px 10px 17px -10px rgba(255, 255, 255, 0.65);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}

.btn {
  display: flex;
  align-items: center;
  gap: 80px;
  margin-top: 20px;
}

.el-button {
  /* 自定义Button样式 */
  background-color: #25AEBF;
  color: white;
  font-size: 20px;
  width: 80px;
  height: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -4px -4px 10px 2px rgba(54, 57, 60, 0.92);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.input-group {
  position: relative;
  width: 300px;
  margin-top: 20px;
}

/* 确保输入框内部有适当的填充和颜色 */
.input-group .el-input__inner {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #000; /* 设置一个对比度高的字体颜色 */
  background-color: rgba(255, 255, 255, 0.9); /* 背景稍微透明一些 */
  border: 1px solid #ddd;
  outline: none;
  transition: all 0.3s ease;
}

.input-group label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: all 0.3s ease;
}

.input-group input:focus ~ label,
.input-group input:valid ~ label {
  top: -20px;
  font-size: 13px;
  color: #25AEBF;
}

.btn3 {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #25AEBF;
  color: white;
  font-size: 20px;
  width: 200px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 10px 2px rgba(54, 57, 60, 0.92);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn3:hover {
  background-color: #1D94A4;
}

.content img {
  transform: scale(0.85);
  margin-left: 10px;
  margin-top: 20px;
}

.footer {
  display: flex;
  align-items: center;
  margin-top: -30px;
}

.adv {
  background-color: rgba(255, 255, 255, 0.15);
  width: 300px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  animation: float 2s ease-in-out infinite;
}

.adv p {
  color: white;
  font-size: 18px;
  margin: 0;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>