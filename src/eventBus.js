import { reactive } from 'vue';

// 创建一个响应式的状态对象
const state = reactive({
    language: '中文',
    // 添加一个listeners对象用于存储回调函数
    listeners: {
        languageChanged: [],
    },
});

// 创建一个事件总线对象
const eventBus = {
    // 设置语言的方法
    setLanguage: (lang) => {
        state.language = lang;
        // 当语言改变时，通知所有监听器
        state.listeners.languageChanged.forEach(callback => callback(lang));
    },
    // 获取语言的方法
    getLanguage: () => state.language,
    // 订阅语言变化事件的方法
    onLanguageChanged: (callback) => {
        state.listeners.languageChanged.push(callback);
    },
};

export default eventBus;