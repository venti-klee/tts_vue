import OpenAI from "openai";

// 初始化OpenAI客户端，注意替换apiKey为你的实际API密钥或者设置环境变量
const openai = new OpenAI({
    apiKey: 'sk-44a43fb552fd48c189a25c42ca183899', // 如果未设置环境变量，请直接在此处填写你的API Key
    // 或者使用环境变量：process.env.DASHSCOPE_API_KEY,
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
});

async function testApi() {
    try {
        const completion = await openai.chat.completions.create({
            model: "qwen-omni-turbo",  // 确保模型名称正确无误
            messages: [
                {
                    role: "system",
                    content: [{ type: "text", text: "You are a helpful assistant." }]
                },
                {
                    role: "user",
                    content: [
                        { type: "image_url", image_url: { url: "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg" } },
                        { type: "text", text: "图中描绘的是什么景象？" }
                    ]
                }
            ],
            stream: true,
            stream_options: {
                include_usage: true
            },
            modalities: ["text"],
        });

        for await (const chunk of completion) {
            if (Array.isArray(chunk.choices) && chunk.choices.length > 0) {
                console.log(chunk.choices[0].delta);
            } else {
                console.log(chunk.usage);
            }
        }
    } catch (error) {
        console.error('Error during API call:', error);
    }
}

testApi();