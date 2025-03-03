// src/eventBus.js
import { reactive } from 'vue';

// 创建一个响应式的状态对象
const state = reactive({
    language: 'zh-CN',
});

// 创建一个事件总线对象
const eventBus = {
    // 设置语言的方法
    setLanguage: (lang) => {
        state.language = lang;
    },
    // 获取语言的方法
    getLanguage: () => state.language,
};

export default eventBus;