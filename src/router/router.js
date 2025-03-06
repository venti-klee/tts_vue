// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: "/",
        name: "首页",
        component: () => import("@/Views/IndexView.vue"),
        children: [
            {
                path: "tts_out",
                name: "音频输出",
                hidden: false,
                component: () => import("@/Views/TTSOUTView.vue"),
            },
            {
                path: "tts_ppt",
                name: "有声课件",
                hidden: false,
                component: () => import("@/Views/TTSPPTView.vue"),
            },
            {
                path: '/ppt_video', // 确保这是VideoPage组件的路由路径
                name: 'ppt_video',
                component: () => import("@/Views/PPTVideoView.vue"),
            },
            {
                path: "tts_pdf",
                name: "有声书",
                hidden: false,
                component: () => import("@/Views/TTSPDFView.vue"),
            },
            {
                path: "tts_test",
                name: "发音练习",
                hidden: false,
                component: () => import("@/Views/TTSTESTView.vue"),
            },
            {
                path: "tts_replace",
                name: "声音置换",
                hidden: false,
                component: () => import("@/Views/TTSREPLACEView.vue"),
            },
            {
                path: "tts_teacher",
                name: "AI教师",
                hidden: false,
                component: () => import("@/Views/TTSTEACHERView.vue"),
            },
        ],
    },
    {
        path: "/login",
        name: "登录",
        hidden: true,
        component: () => import("@/Views/LoginView.vue"),
    },
];

// 创建路由实例并传递 routes 配置
const router = createRouter({
    history: createWebHistory(), // 使用 history 模式
    routes, // 将 routes 数组传递给 Vue Router
});

export default router;