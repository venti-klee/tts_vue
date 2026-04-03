# 声动学堂

> 集语音合成、有声课件、AI 教师于一体的多功能 TTS 教育平台

## 项目简介

声动学堂是一个基于 Vue 3 的教育应用，整合多种 TTS 引擎与 AI 能力，为语言学习和音频内容创作提供一站式解决方案。支持文字转语音、PPT 有声课件生成、PDF 有声书制作、发音练习、声音克隆及 AI 教师辅导等功能。

## 功能模块

| 模块 | 说明 |
|------|------|
| **音频输出** | 文本转语音，支持多引擎、多语种选择 |
| **有声课件** | 将 PPT 演示文稿转换为带语音讲解的视频 |
| **有声书** | 将 PDF 文档转换为带字幕的有声读物 |
| **发音练习** | 词汇与句子发音练习工具 |
| **声音置换** | 基于声音克隆技术的语音替换 |
| **AI 教师** | OpenAI 驱动的智能教学助手 |

## 特色亮点

- **多方言支持** — 普通话、粤语、上海话、四川话等
- **虚拟形象** — 可选择不同教学形象
- **数学渲染** — MathJax 支持数学公式展示
- **粒子特效** — tsparticles 动态背景

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Vue 3 + Vue Router |
| UI 组件 | Element Plus |
| AI 能力 | OpenAI API |
| PDF 处理 | pdfjs-dist · vue-pdf-embed |
| 音频可视化 | vue-audio-visual |
| 国际化 | vue-i18n |
| 后端服务 | Express + Multer |
| 字幕解析 | parse-srt |

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run serve

# 构建生产版本
npm run build
```

## 页面路由

| 路径 | 页面 |
|------|------|
| `/login` | 登录页 |
| `/index/tts_out` | 音频输出 |
| `/index/tts_ppt` | 有声课件 |
| `/index/tts_pdf` | 有声书 |
| `/index/tts_test` | 发音练习 |
| `/index/tts_replace` | 声音置换 |
| `/index/tts_teacher` | AI 教师 |

## License

MIT
