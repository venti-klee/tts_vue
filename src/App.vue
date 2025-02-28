<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div id="app">
<!--全局粒子动态背景      -->
      <vue-particles
          id="ts_particles"
          @particles-loaded="particlesLoaded"
          :options="particlesOptions"
      />
    </div>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import LoginView from "@/Views/LoginView.vue";
// eslint-disable-next-line no-unused-vars
const particlesLoaded = async container => {
  console.log("Particles container loaded", container);
}
// 随机颜色生成函数
// eslint-disable-next-line no-unused-vars
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default {
  name: 'App',
  components: {
    // LoginView,
    // HelloWorld
  },
  data() {
    return {
      particlesOptions: {
        background: {
          image: "linear-gradient(to top,#242b35 60%, #1B1F27FF 80%)", // 渐变，边界线在 30% 和 70% 的位置
          repeat: "no-repeat", // 防止渐变重复
          size: "cover", // 覆盖整个画布
          position: "center center" // 渐变从中心开始
        },
        // background: {
        //   color: {
        //     // value: '#242b35'
        //   }
        // },
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
            value: ["#ffffff", "#00FF00", "#1d94a4",
              "#FFFF00", "#f3a1f3"], // 随机颜色数组
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
              value_area: 800 // 密度调整，根据画布大小动态调整粒子数量
            },
            value: 80,
            limit:150,
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
      }
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#ts_particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #242b35, #1b1f27); /* 备用渐变样式 */
}
</style>
