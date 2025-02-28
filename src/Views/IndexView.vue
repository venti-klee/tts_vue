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
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
<!--          logo-->
          <div class="logo" >
            <el-image src='/static/logo6.png' alt="logo" class="img1"></el-image>
            <el-image src='/static/title.png' alt="logo" class="img2"></el-image>
          </div>
          <el-menu
              router
              :default-active="$route.path"
              active-text-color="#ffd04b"
              background-color="rgba(0, 0, 0,1)"
              text-color="#999"
              style="width: 100%;border: none"

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
        <el-col :xs="16" :sm="18" :md="20" :lg="21" :xl="23">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
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
      ]
    }
  }
}
</script>

<style>
.content {
  position: relative;
  background-color: rgba(0, 0, 0, 0.5) !important;
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
}
.img1{
  height:50px;
  width:50px;
}
.img2{
  height:40px;
  margin-left:5px;

}
</style>