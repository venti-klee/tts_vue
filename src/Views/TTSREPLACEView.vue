<script setup>
import PPTUploader from '@/components/PPTUploader.vue';
import SoundAdjust from "@/components/SoundAdjust.vue";
import VoiceSelector from "@/components/VoiceSelector.vue";
import AduioShow from "@/components/AduioShow.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
const audioSrc = ref(""); // 存放音频文件路径
const uploadedFile = ref(null); // 存放上传的文件信息
// 处理文件上传回调
const handleFileUpload = (file) => {
    uploadedFile.value = null; // 先清空
    setTimeout(() => {
        uploadedFile.value = file; // 赋值新文件
        console.log("文件已上传，文件名:", file.name);
    }, 0); // 让 Vue 重新检测到变化
    console.log("handleFileUpload 被调用");
};
const generateAudio = () => {
    if (uploadedFile.value) {
        const fileType = uploadedFile.value.name.split('.').pop().toLowerCase(); // 获取文件后缀
        console.log("上传文件为",fileType);
        if (fileType === 'mp4') {
            // 如果是视频文件，则跳转路由
            router.push({ name: 'ppt_video' }, { replace: true });
        } else if (['mp3', 'm4v', 'wav'].includes(fileType)) {
            // 如果是音频文件，则赋值音频路径
            audioSrc.value = "/static/操作系统替换.wav";
        } else {
            alert("请上传正确格式的音频或视频文件！");
        }
    } else {
    alert("请先上传文件！");
    }
};

</script>
<template>
    <div >
        <el-row>
            <!-- <p class="tip">*只允许接收音频/视频文件</p> -->
            <!-- ppt上传+文本解析 -->
            <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
            <el-col >
                <p-p-t-uploader class="ppt-upload-container" @file-upload="handleFileUpload"></p-p-t-uploader>
            </el-col>
            </el-col>

            <!--声音样本-->
            <el-row>
            <voice-selector class="voice-select-container" @select-voice="handleVoiceSelect"></voice-selector>
            </el-row>
            
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
            <el-row>
            <el-col :span="24">
                <sound-adjust class="sound-adjust-cotainer"></sound-adjust>
                <el-button class="btn1" @click="generateAudio">开始置换</el-button> 
            </el-col>
            </el-row>
            <el-row>
            
            </el-row>
        </el-col>
        </el-row>
        <!--音频输出-->
        <el-row class="audio-show">
            <aduio-show :src="audioSrc"></aduio-show>
        </el-row>
    </div>
    </template>

<style scoped>

.tip{
    position:absolute;
    z-index:99;
    font-size:14px;
    color:#d0d2d483;
    left:50px;
    top:30px;
    height:25px;
    z-index:999;
}
.ppt-upload-container{
    margin-left:40px;
    margin-top:15px;
    width:660px;
}
.sound-adjust-cotainer{
    margin-left:25px;
    /* margin-right:25px; */
    width:91%;
    margin-top:-368px;
    padding:0;
}
.voice-select-container{
    margin-left:40px;
    width:680px;
    margin-top:-10px;
    height:145px;
}
.btn1 {
    position:absolute;
    width:95%;
    bottom:-60px;
    margin-left: 25px;
    height: 40px;
    background-color: #25AEBF;
    color: white;
    border-radius: 10px;
    border: none;
    z-index:999;
}
.btn1:hover {
    background-color: #1D94A4;
}
.audio-show{
    margin-top:95px;
    margin-left:40px;
}
</style>