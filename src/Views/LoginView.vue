<template>
  <!-- 导航栏 -->
  <div class="header">
    <div class="logo">
      <img src="/static/logo6.png" alt="logo" class="img1">
      <img src="/static/title.png" alt="logo" class="img2">
    </div>
    <div class="menu1">
      <ul class="menu-list1">
        <li v-for="(item, index) in menuItems" :key="index" @click="showLogin = index === 5">
            <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>

  <el-dialog v-model="showLogin" title="Warning" width="500" center>
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showLogin = false">Cancel</el-button>
        <el-button type="primary" @click="showLogin = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

  <div class="main-contant">
    <!-- 第一页 -->
    <div class="page1">

    </div>
    <!-- 第二页 -->
    <div class="page2">
      <!-- 图片轮播 -->
      <div class="carousel">

        <div class="left-panel">
          <!-- 白色竖线 -->
          <div class="vertical-line">
            <!-- 滑块 -->
            <div class="slider" :style="sliderStyle"></div>
          </div>
          <!-- Steps 列表 -->
        <div class="steps">
          <div 
            v-for="(step, index) in steps" 
            :key="index" 
            class="step" 
            @click="setActiveStep(index)"
          >
            <p class="step-title }">{{ step.title }}</p>
            <p v-show="activeStep === index" class="step-details">{{ step.details }}</p>
          </div>
        </div>
      </div>


        <!-- 右侧图片展示区 -->
        <div class="right-panel">
          <img :src="steps[activeStep]?.imgSrc" alt="pic" class="step-img">
        </div>
      </div>
    </div>
    <!-- 第三页 -->
    <div class="page3">
      <div class="bubble-scroll">
        <div class="animation">
          <div class="bubble-pair">
            <div class="bubble-blue">详细解释一下质能方程</div>
            <div class="bubble-pink">求解二元一次方程组</div>
            <div class="bubble-yellow">从祥林嫂背后看时代的悲哀</div>
            <div class="bubble-green">500个高中最常用英语单词</div>
            <div class="bubble-blue">详细解释一下质能方程</div>
            <div class="bubble-pink">求解二元一次方程组</div>
            <div class="bubble-yellow">从祥林嫂背后看时代的悲哀</div>
            <div class="bubble-green">500个高中最常用英语单词</div>
          </div>
          <div class="bubble-pair">
            <div class="bubble-yellow">396的最大因数?</div>
            <div class="bubble-blue">藤野先生的性格剖析</div>
            <div class="bubble-green">麦哲伦海峡形成的历史背景</div>
            <div class="bubble-blue">快速求解345和298的最大公因数</div>
            <div class="bubble-yellow">396的最大因数?</div>
            <div class="bubble-blue">藤野先生的性格剖析</div>
            <div class="bubble-green">麦哲伦海峡形成的历史背景</div>
            <div class="bubble-blue">快速求解345和298的最大公因数</div>
          </div>
          <div class="bubble-pair">
            <div class="bubble-green">离散型随机变量的分布</div>
            <div class="bubble-blue">列出三角函数的单调性</div>
            <div class="bubble-yellow">高中集合运算大全</div>
            <div class="bubble-pink">苏轼写下赤壁怀古时的心境</div>
            <div class="bubble-green">离散型随机变量的分布</div>
            <div class="bubble-blue">列出三角函数的单调性</div>
            <div class="bubble-yellow">高中集合运算大全</div>
            <div class="bubble-pink">苏轼写下赤壁怀古时的心境</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 第四页 -->
    <div class="page4">
      <div class="voice-character">
        <div class="character">
          <img src="/static/首页/引用组件1.png" alt="人物">
          <p>女教师</p>
        </div>
        <div class="character">
          <img src="/static/首页/引用组件2.png" alt="人物">
          <p>小女孩</p>
        </div>
        <div class="character">
          <img src="/static/首页/引用组件3.png" alt="人物">
          <p>男高中生</p>
        </div>
        <div class="character">
          <img src="/static/首页/引用组件4.png" alt="人物">
          <p>学长</p>
        </div>
      </div>
    </div>
    <!-- 第五页 -->
    <div class="page5">
      <div class="vtuber-contant">
        <img src="/static/首页/v1.png" alt="pic" class="img_v1">
        <img src="/static/首页/v2.png" alt="pic" class="img_v2">
        <img src="/static/首页/vtuber.png" alt="pic" class="img_v3">
      </div>
    </div>
  </div>
  
  <!-- 登录窗口 -->
  <!-- <div class="content">
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
  </div> -->

</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { watch } from "vue";
export default {
  setup() {
    const router = useRouter();
    const loginForm = ref(null);
    const showLogin = ref(false);
    const username = ref('');
    const password = ref('');
    
    const activeStep = ref(0); // 默认选中 Step 1
    const steps = ref([
      { title: "音频输出", imgSrc: "/static/首页/11.png", details:"智能语音，自由调控，声音表达更生动"},
      { title: "有声课件", imgSrc: "/static/首页/22.png", details:"PPT 变课堂，AI 讲师带你沉浸式学习"},
      { title: "有声书", imgSrc: "/static/首页/33.png" , details:"轻松打造课文阅读，助力自主学习"},
      { title: "声音置换", imgSrc: "/static/首页/44.png" , details:"声音焕新，随心演绎，个性化表达无限可能"}
    ]);
    // 滑块的样式
    const sliderStyle = computed(() => ({
      top: `${(activeStep.value / (steps.value.length - 1)) * 75}%`
    }));
    const handleClick = (index) => {
      if (index === 5) {
        showLogin.value = true;
        console.log("登录");
      }
      console.log(showLogin.value);
    };
    watch(showLogin, (newVal) => {
      console.log("showLogin 变化:", newVal);
    });
    const login = () => {
      if (username.value && password.value) {
        alert(`登录成功: ${username.value}`);
        showLogin.value = false;
        router.push('/indexView');
      } else {
        alert('请输入用户名和密码');
      }
    };
    // 设置当前 step
    const setActiveStep = (index) => {
      activeStep.value = index;
    };

    const menuItems = [
      { text: '硬件匹配', icon: "/static/返回.png" },
      { text: '应用落地', icon: "/static/返回.png" },
      { text: '开放平台', icon: "/static/返回.png" },
      { text: '联系我们', icon: "/static/返回.png" },
      { text: '关于我们', icon: "/static/返回.png" },
      { text: '登录', icon: "/static/返回.png" }
    ];

    return { handleClick,login, router,loginForm, menuItems,activeStep,steps,sliderStyle,setActiveStep};
  }
};
</script>

<style scoped>
.header{
  width: 100%;
  height:60px;
  /* background-color: red; */
  display: flex;
  justify-items: center;
  align-items: center;
  .logo {
    display: flex;
    align-items: center;
    margin-left: 50px;
    .img1 {
      height: 40px;
      width: 40px;
    }
    .img2 {
      height: 35px;
      margin-left: 5px;
    }
  }
  .menu1{
    display:flex;
    justify-items: center;
    align-items: center;
    width:70%;
    .menu-list1{
      display:flex;
      gap:40px;
      cursor:pointer;
    }
  }
}
.main-contant{
  display: flex;
  flex-direction: column; /* 竖直排列 */
}
.main-contant > div {
  width: 100%;
  min-height: 100vh; /* 至少等于屏幕高度，超过则自然显示 */
  background-size: cover; /* 确保背景图片填充整个区域 */
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 防止图片重复 */
}
/* 设置每一页的背景图片 */
.page1 {
  background-image: url("@/assets/static/首页1.png");
}

.page2 {
  background-image: url("@/assets/static/首页2.png");
  display:flex;
  .carousel{
    width:100%;
    margin:200px 300px 100px 300px;
    background-color: rgba(60,67,75,0.32);
    display:flex;
    gap:100px;
    border-radius: 20px;
    position: relative;
    .left-panel{
      width:50%;
      display:flex;
      align-items: center;
      padding:40px 80px;
      position:relative;
      /* 竖线 */
      .vertical-line {
        position: absolute;
        width: 1px;
        height: 90%;
        background: white;
        /* 滑块样式 */
        .slider {
          z-index:999;
          position: absolute;
          left: -3px;
          width: 8px;
          height: 25%; /* 等于 el-steps 的 1/4 */
          background: linear-gradient(to bottom, #EEA8C7, #8ABFF3); /* 上粉下蓝 */
          z-index: 10; /* 确保滑块在上层 */
          border-radius: 15px;
          transition: top 0.3s ease;
        }
      }
      /* 步骤列表 */
      .steps {
        width: 100%;
        height: 100%; /* 让steps填满left-panel */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly; /* 让step-title纵向4等分 */
        gap: 60px;
        padding-bottom:40px;
      }
      .step {
        width:100%;
        margin-left:30px;
        cursor: pointer;
        padding: 5px 10px;
        transition: 0.3s;
        position: relative; /* 让 step-details 绝对定位时相对 step */
        .step-title{
          color:white;
          font-size:20px;
          white-space: nowrap; /* 防止换行 */
        }
        .step-details{
          transition: 0.3s;
          color:#808080;
          font-size:16px;
          position:absolute;
          width: 100%; /* 让它占满整行 */
        }
      }
    }
    .right-panel{
      position: absolute;
      right:80px;
      top:10%;
      display: flex;
      justify-content:center;
      transition: 0.6s;
      .step-img{
        width:350px;
      }
    }
  }
  
  
}
@keyframes rowup {
  from {
      transform: translateX(0%);
  }

  to {
      transform: translateX(-500px);
  }
}
.page3 {
  background-image: url("@/assets/static/首页3.png");
  display:flex;
  .bubble-scroll{
    width:100%;
    margin:230px 200px 100px 200px;
    background-color: rgba(60,67,75,0.32);
    display:flex;
    gap:50px;
    border-radius: 20px;
    position: relative;
    font-size:18px;
    color:white;
    overflow: hidden;
    padding:50px 30px;
  
  }
  .bubble-pair{
    display:flex;
    gap:50px;
    flex: 1; /* 让 3 行 bubble-pair 在高度上均分 */
    align-items: center; /* 让气泡在行内垂直居中 */
  }
  .animation{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    animation: rowup 5s linear infinite;
    height: 100%; /* 让 .bubble-pair 填充满父级 */
  }
  .bubble-blue{
    padding:15px 20px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: #60A7F7;
    border-radius: 40px;
    margin-top:10px;
    margin-bottom:10px;
    white-space: nowrap; /* 让文字不换行 */
  }
  .bubble-yellow{
    padding:15px 20px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: #F5C93B;
    border-radius: 40px;
    margin-top:10px;
    margin-bottom:10px;
    white-space: nowrap; /* 让文字不换行 */
  }
  .bubble-green{
    padding:15px 20px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: #43CF7C;
    border-radius: 40px;
    margin-top:10px;
    margin-bottom:10px;
    white-space: nowrap; /* 让文字不换行 */
  }
  .bubble-pink{
    padding:15px 20px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: #EFA8C6;
    border-radius: 40px;
    margin-top:10px;
    margin-bottom:10px;
    white-space: nowrap; /* 让文字不换行 */
  }

}

.page4 {
  background-image: url("@/assets/static/首页4.png");
  .voice-character{
    margin:250px 300px 100px 300px;
    display:flex;
    justify-content: center;
    align-items: center;
    gap:100px;
    .character{
      display:flex;
      flex-direction: column;
      align-items: center;
      img{
        width:250px;
      }
      p{
        color:white;
        font-size:20px;
        margin-top:20px;
      }
    }
  }
}

.page5 {
  background-image:url("@/assets/static/首页5.png");
  .vtuber-contant{
    margin-top:200px;
    display:flex; 
    justify-content: center; /* 让图片水平排列并居中 */
    width:100%;
    gap:50px;
    img{
      max-width: 100%; /* 确保图片不会超出父容器 */
      height: auto; /* 保持原始宽高比 */
      object-fit: contain; /* 让图片按比例缩放 */
    }
    .img_v1{
      width:250px;
      margin-left:-50px;
      margin-bottom:20px;
    }
    .img_v2{
      width:200px;
      margin-top:-10px;
    }
    .img_v3{
      height:380px;
      margin-left:30px;
      margin-top:40px;
    }
  }
}

/* 遮罩层 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 登录框 */
.login-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

/* 登录/注册切换按钮 */
.tab-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}
.tab-buttons button {
  border: none;
  background: transparent;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}
.tab-buttons .active {
  font-weight: bold;
  border-bottom: 2px solid #007BFF;
}

/* 输入框 */
.form-group input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 按钮组 */
.button-group button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.login-btn {
  background: #007BFF;
  color: white;
}
.cancel-btn {
  background: #ccc;
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



</style>