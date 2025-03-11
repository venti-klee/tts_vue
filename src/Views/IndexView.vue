<template>
  <div class="index">
    <floating-ball></floating-ball>
    <!-- 全局粒子动态背景 -->
    <vue-particles
        id="tsparticles"
        :options="particlesOptions"
    ></vue-particles>

    <div class="content">
      <!-- 左侧导航栏 -->
      <div class="left-menu">
        <div class="logo">
          <img src="/static/logo6.png" alt="logo" class="img1">
          <img src="/static/title.png" alt="logo" class="img2">
        </div>
        
        <ul class="menu-list">
          <li v-for="(item, index) in menuItems" 
              :key="index" 
              :class="['menu-item', { active: isActive(item.route) }]">
            <router-link :to="item.route" class="menu-link">
              <i :class="item.icon"></i>
              <span>{{ item.text }}</span>
            </router-link>
          </li>
        </ul>
        
      </div>
      <!-- 右侧内容区 -->
      <div class="main-content">
        <router-view></router-view> <!-- 这里显示对应的组件 -->
        <div class="dropdown"  ref="dropdown">
            <img src="/static/个人.png" alt="logo" class="img3"  @click="toggleDropdown">
            <ul class="dropdown-menu" v-show="dropdownVisible">
                <li @click="goToLogin">退出登录</li>
            </ul>
        </div> 
      </div>

    </div>
  </div>
</template>

<script>
// import {UserFilled} from "@element-plus/icons-vue";
// import {ElMessage} from "element-plus";
// import {useRouter} from "vue-router";

import FloatingBall from "@/components/FloatingBall.vue";

export default {
  components: {FloatingBall},
  data() {
    return {
      dropdownVisible: false, // 控制下拉菜单的显示和隐藏
      particlesOptions: {
        background: {
          image: "linear-gradient(to top,#242b35 60%, #1B1F27FF 80%)",
          repeat: "no-repeat",
          size: "cover",
          position: "center center"
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push'
            },
            onHover: {
              enable: true,
              mode: 'repulse'
            },
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 20
            },
            push: {
              quantity: 4
            },
            repulse: {
              distance: 200,
              duration: 0.4
            }
          }
        },
        particles: {
          color: {
            value: ["#ffffff", "#00FF00", "#1d94a4", "#FFFF00", "#f3a1f3"],
          },
          links: {
            color: '#1ac5dc',
            distance: 150,
            enable: true,
            opacity: 0.7,
            width: 2
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: 'bounce',
            random: false,
            speed: 6,
            straight: false
          },
          number: {
            density: {
              enable: true,
              value_area: 800
            },
            value: 200,
            limit: 200,
            min: 200,
            max:250,
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'circle'
          },
          size: {
            value: {min: 1, max: 7}
          }
        },
        detectRetina: true
      },
      menuItems: [
        {
          route: '/tts_out',
          text: '音频输出',
          icon: 'icon-class-name', // 根据实际图标类名调整
          children: null
        },
        {
          route: '/tts_ppt',
          text: '有声课件',
          icon: 'icon-class-name',
          children: null
        },
        {
          route: '/tts_pdf',
          text: '有声书',
          icon: 'icon-class-name',
          children: null
        },
        {
          route: '/tts_test',
          text: '发音练习',
          icon: 'icon-class-name',
          children: null
        },
        {
          route: '/tts_replace',
          text: '声音置换',
          icon: 'icon-class-name',
          children: null
        },
        {
          route: '/tts_teacher',
          text: 'AI教师',
          icon: 'icon-class-name',
          children: null
        },
      ]
    }
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;  // 判断当前路由是否与 menuItem 的 route 相匹配
    },
    // 切换下拉菜单显示
    toggleDropdown(event) {
      this.dropdownVisible = !this.dropdownVisible;
      event.stopPropagation(); // 阻止点击事件冒泡
    },
    
    // 跳转到 LoginView
    goToLogin() {
      this.$router.push({ name: '登录' });  // 使用路由跳转到 LoginView
      this.dropdownVisible = false; // 关闭下拉菜单
    },
    
    // 监听点击事件，点击外部区域关闭下拉菜单
    handleClickOutside(event) {
      const dropdown = this.$refs.dropdown;  // 获取 dropdown 组件
      if (dropdown && !dropdown.contains(event.target)) {
        this.dropdownVisible = false; // 点击外部区域时关闭下拉菜单
      }
    }
  },
  mounted() {
    if (this.$route.path === '/') {
      this.$router.replace(this.menuItems[0].route); // 重定向到第一个页面
    }
    document.addEventListener('click', this.handleClickOutside);  // 监听全局点击事件
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);  // 组件销毁时移除事件监听
  },

}
</script>

<style>
a {
    text-decoration: none;
}
* {
    margin: 0;
    padding: 0;
    list-style-type: none; /* 去掉列表项前的圆点 */
}
.el-col{
  height: 100%;
}
.content {
  position: relative;
  display:flex;
  background-color: rgba(0,0,0, 0.5)  !important;
  z-index: 10; /* 确保内容在粒子背景的上方 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  padding: 0;
  margin: 0;
}

#tsparticles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #242b35, #1b1f27); /* 备用渐变样式 */
  padding:0;
}
.logo{
  background-color: transparent; 
  transition: background-color 0.3s ease; /* 添加过渡效果 */
  display: flex;
  align-items:center;
  margin-left:10px;
  margin-top:0px;
  width:100%;
}
.index{
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  transition: background-color 0.3s ease; /* 添加过渡效果 */
  padding: 0;
  margin: 0;
  height: 100vh;

}
.left-menu{
  width: 220px;
  height: 95%;
  background-color: rgb(75, 88, 98,0.65);
  padding: 20px 0;
  transition: width 0.3s ease; /* 添加过渡效果 */
}
.img1{
  left:10px;
  height:38px;
  width:38px;
}
.img2{
  height:40px;
  margin-left:5px;

}
.img3 {
  position: absolute;  /* 绝对定位 */
  top: 10px;            /* 距离父元素顶部 20px */
  right: 20px;          /* 距离父元素右边 20px */
  height: 30px;
  width: 30px;
  z-index: 999;          /* 确保 img3 在其他内容上方显示 */
  cursor: pointer;
}
.el-col {
  width:500px;
}
.menu-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none; /* 去掉列表项前的圆点 */
  font-size:18px;
}

.menu-item {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  opacity: 0.8;
  position: relative; /* 为了可以定位子元素 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-link {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none; /* 去掉下划线 */
  padding: 15px 10px;
}
.menu-item:hover .menu-link,
.menu-item.active .menu-link {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4B5862; 
  transition: background-color 0.2s ease;
  width: 80%;
  border-radius: 10px;
}
.main-content {
  position: relative;  /* 使 img3 可以相对于 .main-content 定位 */
  width: calc(100% - 220px);  /* 让右侧内容区占满剩余空间 */
  height:100vh;
}
.dropdown{
  position: absolute; /* 绝对定位 */
  top: 0px; /* 固定在右上角 */
  right: 00px;
}
/* 下拉菜单默认隐藏 */
.dropdown-menu {
  /* display: none; */
  position: absolute;
  margin-top: 50px; /* 让下拉框出现在头像下方 */
  margin-right:10px;
  right: 10px;
  background-color: #4B5862;
  color:white;
  border-radius: 8px;
  padding: 8px 5px;
  width: 100px;
  height:25px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999; 
  }
  /* 菜单选项 */
  .dropdown-menu li {
    list-style: none;
    text-align: center;
    cursor: pointer;
    color: white;
    transition: background-color 0.3s ease;
  }

</style>
