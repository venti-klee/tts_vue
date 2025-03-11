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
  <el-dialog 
    width="360" 
    v-model="showLogin" 
    center 
    :show-close="false"
    top="22vh"
    custom-class="vDialog"
  >
    <el-form ref="loginForm" :model="loginData" :rules="rules" status-icon>
      <div class="btn">
        <button :class="isRegister ? 'btn1' : 'btn2'"  @click.prevent="isRegister = true">注册</button>
        <button :class="isRegister ? 'btn2' : 'btn1'"  @click.prevent="isRegister = false">登录</button>
      </div>
      
      <div class="input-group">
        <el-form-item prop="userid">
          <el-input v-model="loginData.userid" placeholder="账号"></el-input>
        </el-form-item>

        <el-form-item prop="userpass">
          <el-input type="password" v-model="loginData.userpass" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item v-if="isRegister" prop="comfirmedpass">
          <el-input type="password" v-model="loginData.comfirmedpass" placeholder="确认密码"></el-input>
        </el-form-item>
      </div>

      <div class="footer">
        <div class="dialog-footer">
          <button class="btn3" @click.prevent="submitForm">{{ isRegister ? "注册" : "登录" }}</button>
          <button class="btn4" @click="showLogin = false">取消</button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>


<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { watch } from "vue";
import { ElMessage } from 'element-plus';
export default {
  setup() {
    const router = useRouter();
    const loginForm = ref(null);
    const showLogin = ref(false);
    const isRegister = ref(false);
    // 存储用户输入的数据
    const loginData = ref({
      userid: '',
      userpass: '',
      comfirmedpass: '',
    });
    // 账号 & 密码规则
    const rules = {
      userid: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { max: 20, message: '账号长度不能超过20位', trigger: 'blur' }
      ],
      userpass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能小于8位', trigger: 'blur' },
        { 
          validator: (rule, value, callback) => {
            const hasLetter = /[a-zA-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpecial = /[^a-zA-Z0-9]/.test(value);
            if (!hasLetter || !hasNumber || !hasSpecial) {
              callback(new Error('密码必须包含字母、数字和特殊字符'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }
      ],
      comfirmedpass: [
        { required: true, message: "请确认密码", trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (value !== loginData.value.userpass) { // ✅ 这里修正
              callback(new Error("两次输入的密码不一致"));
            } else {
              callback();
            }
          },
          trigger: "blur",
        },
      ],
    };
    const switchMode = (mode) => {
      isRegister.value = mode;
    };
    // 提交表单
    const submitForm = () => {
      if (!loginForm.value) {
        return;
      }

      loginForm.value.validate((valid) => {
        if (valid) {
          if (isRegister.value) { 
            ElMessage.success('注册成功！');
          } else {
            ElMessage.success('登录成功！');
          }
          showLogin.value = false;
          router.push('/index'); 
        } else {
          ElMessage.error('请检查输入信息');
        }
      });
    };
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

    return { handleClick,
      router,
      loginForm,
      menuItems,
      activeStep,
      steps,
      sliderStyle,
      setActiveStep,
      showLogin,
      loginData, 
      rules, 
      isRegister,
      submitForm,
      switchMode,
       };
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
:deep(.el-form-item){
  margin:0;
  padding:0;
  width:90%;
}
.el-dialog , :deep(.el-dialog) {
  background-color: rgba(255, 255, 255, 0.38) !important;
  backdrop-filter: blur(3px);
  border: none;
  width: 400px;
  height: 560px;
  border-radius: 60px;
  box-shadow: 10px 10px 9px -8px rgba(255, 255, 255, 0.65);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:200px;
}

:deep(.el-dialog__header) {
  display: none; /* 隐藏头部 */
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:0px;
  gap: 80px;
  border:none;
  width:100%;
  .btn1{
    width:80px;
    padding:5px 8px;
    border:none;
    background-color: #60A7F7;
    color: white;
    font-size: 16px; 
    box-shadow: 8px 8px 17px -10px rgba(0, 0, 0, 1);
    border-radius: 30px;
  }
  .btn2{
    width:80px;
    padding:5px 8px;
    border:1px solid black;
    background-color: white;
    color: black;
    font-size: 16px; 
    box-shadow: none;
    border-radius: 30px;
  }
}
.input-group {
  margin-top: 20px;
  margin-bottom: 25px;
  margin-left:30px;
  margin-right:30px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:20px;
  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: all 0.3s ease;
  }
}
.footer{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:20px;
  margin-bottom:20px;
}
.dialog-footer{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  border:none;
  width:90%;
  .btn3{
    width:100%;
    height:50%;
    padding:5px;
    margin:0;
    background: linear-gradient(to right, #60A7F7, #EFA8C6); /* 备用渐变样式 */
    border-right: 0.5px solid rgba(255,255,255,0.3);
    border-bottom: 0.5px solid rgba(255,255,255,0.3);
    border-top:none;
    border-left:none;
    color: white;
    font-size: 16px; 
    box-shadow:none;
    border-radius: 10px;
  }
  .btn4{
    margin:0;
    width:100%;
    height:50%;
    padding:5px;
    background: white; 
    border:#808080 1px solid;
    color: black;
    font-size: 16px; 
    box-shadow:none;
    border-radius: 10px;
  }
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

.input-group input:focus ~ label,
.input-group input:valid ~ label {
  top: -20px;
  font-size: 13px;
  color: #25AEBF;
}


</style>