<template>
  <div class="index">
    <!-- 全局粒子动态背景 -->
    <vue-particles
        id="tsparticles"
        :options="particlesOptions"
    ></vue-particles>
    <!-- 放在粒子背景的外部的导航 -->
    <div class="content">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="1" style="height: 100%;">
<!--          logo-->
          <div class="logo" >
            <el-image src='/static/logo6.png' alt="logo" class="img1" :fit="contain"></el-image>
            <el-image src='/static/title.png' alt="logo" class="img2" :fit="contain"></el-image>
          </div>
          <el-menu
              router
              :default-active="$route.path"
              active-text-color="#ffd04b"
              background-color="rgba(0, 0, 0,1)"
              text-color="#999"
              style="width: 100%;border: none ;height: 100vh
"

          >
            <template v-for="(item, index) in menuItems" :key="index">
              <el-sub-menu v-if="item.children && item.children.length" :index="item.route || ''">
                <template #title>
                  <el-icon><component :is="item.icon || 'i'"></component></el-icon>{{ item.text }}
                </template>
                <el-menu-item
                    v-for="child in item.children"
                    :key="child.name"
                    :index="child.route || ''"
                >
                  <template #title>
                    <el-icon><component :is="child.icon || 'i'"></component></el-icon>{{ child.text }}
                  </template>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="item.route || ''">
                <template #title>
                  <el-icon><component :is="item.icon || 'i'"></component></el-icon>{{ item.text }}
                </template>
              </el-menu-item>
            </template>
          </el-menu>
        </el-col>
        <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="23">
            <div class="common-layout">
              <el-container>
                <el-header style="text-align: right; font-size: 12px">
                  <div class="toolbar">
                    <el-dropdown @command="handleCommand">
                      <el-icon style="margin-right: 8px; margin-top: 1px"><user-filled /></el-icon>
                      <span>用户</span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </el-header>
                <el-main style="width: 100%" >
                  <div>
                    <router-view style="width: 100%"></router-view>
                  </div>

                </el-main>
              </el-container>
            </div>


        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {UserFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

export default {
  components: {UserFilled},
  data() {
    return {
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
            value: 80,
            limit: 150,
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
  setup() {
    const router = useRouter();

    const handleCommand = (command) => {
      if (command === 'logout') {
        handleLogout();
      }
    };

    const handleLogout = () => {
      // 显示退出成功消息
      ElMessage.success('退出登录成功');

      // 跳转到登录页面
      router.push('/login'); // 假设登录路由为'/login'
    };

    return {
      handleCommand,
    };
  },
}
</script>

<style>
.el-col{
  height: 100%;
}
.content {
  position: relative;
  background-color: rgba(0, 0, 0, 0.5) !important;
  z-index: 10; /* 确保内容在粒子背景的上方 */
  height: 100%;
  color: white;
  padding: 0;
  margin: 0;

}
*{
  margin: 0;
  padding: 0;

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
  background-color: rgba(0, 0, 0, 1); /* 半透明黑色背景 */
  transition: background-color 0.3s ease; /* 添加过渡效果 */
  display: flex;
  align-items:center;
  margin-left:0;
  width:100%;
  position: relative;
}
.index{
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  transition: background-color 0.3s ease; /* 添加过渡效果 */
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}
.img1{
  margin-left: 10px;
  margin-top: 15px;
  height:40px;

}
.img2{
  height:35px;
  margin-left: 5px;
  margin-top: 15px;


}
</style>