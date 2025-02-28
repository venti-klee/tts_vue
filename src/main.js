import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus'; // 注意：ElementUI 在 Vue 3 中应使用 ElementPlus
import 'element-plus/dist/index.css'; // 引入 ElementPlus 的样式文件
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
// 创建 Vue 应用实例
const app = createApp(App);
// 使用 ElementPlus
app.use(ElementPlus);

// 使用 Particles
app.use(Particles, {
    init: async engine => {
        await loadSlim(engine); // 加载 tsParticles 的 slim 版本
    },
});

// 挂载应用到 DOM
app.mount('#app');