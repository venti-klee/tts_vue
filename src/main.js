// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import router from './router/router';
import IndexView from '@/Views/IndexView.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { AVPlugin } from "vue-audio-visual";
import axios from 'axios';

console.log(IndexView); // 如果路径正确，这里会输出组件定义

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 使用 ElementPlus
app.use(ElementPlus);

// 使用 Vue Router
app.use(router);
// 使用 vue-audio-visual
app.use(AVPlugin);

// 将 axios 添加为全局属性
app.config.globalProperties.$http = axios;

// 使用 tsparticles
app.use(Particles, {
    init: async engine => {
        try {
            await loadSlim(engine);
            console.log("tsParticles loaded successfully!");
        } catch (error) {
            console.error("Failed to load tsParticles:", error);
        }
    },
});
app.config.errorHandler = (err, vm, info) => {
    // 过滤掉特定的错误信息
    if (err.message.includes("The play() request was interrupted by a call to pause()")) {
        return; // 不显示该错误
    }
    // 其他错误仍然打印到控制台
    console.error(err, info);
};

// 挂载应用到 DOM
app.mount('#app');