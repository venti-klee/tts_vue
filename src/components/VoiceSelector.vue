<template>
  <div class="voice-selector">
    <!-- 克隆声音开关 -->
    <div class="switch-container">
      <p>克隆人声</p>
      <el-switch
          v-model="isCloned"
          :active-value="true"
          :inactive-value="false"
          :size="100"
          class="custom-switch"></el-switch>
      <p>标准音</p>
    </div>

    <!-- 克隆人声声音样本列表 -->
    <div class="voice-list" v-if="!isCloned">
      <div v-for="(voice, index) in voices" :key="index" class="voice-item" @click="selectVoice(voice)">
        <el-radio v-model="selectedVoiceId" :label="voice.name" class="radio">{{ '' }}</el-radio>
        <img class="voice-image" :src="voice.image" alt="voice image" >
        <div class="btn-container">
          <div class="voice-name">{{ voice.name }}</div>
          <img class="voice-btn" src="/static/播放.png" @click.stop="playVoice(voice)" alt="pic">
        </div>
      </div>

      <div class="voice-add" @click="dialogVisible = true">
        <img :src="require('@/assets/static/加.png')" alt="add voice image" class="voice-image">
        <div class="voice-name">新建声音</div>
        <!-- <el-button class="voice-btn2" type="primary" icon="el-icon-plus" @click.stop="dialogVisible = true">新增</el-button> -->
      </div>
    </div>
    <!-- 标准音声音样本列表 -->
    <div class="voice-list" v-if="isCloned">
      <div v-for="(voice, index) in filteredStandardVoices" :key="index" class="voice-item" @click="selectVoice(voice)">
        <el-radio v-model="selectedVoiceId" :label="voice.name" class="radio">{{ '' }}</el-radio>
<!--        <img class="voice-image" :src="voice.image" alt="voice image" >-->
        <el-avatar class="voice-image" > {{voice.languages}} </el-avatar>
        <div class="btn-container">
          <div class="voice-name">{{ voice.name }}</div>
          <img class="voice-btn" src="/static/播放.png" @click.stop="playVoice(voice)" alt="pic">
        </div>
      </div>

      <!-- <div class="voice-add" @click="dialogVisible = true">
        <img :src="require('@/assets/static/加.png')" alt="add voice image" class="voice-image">
        <div class="voice-name">新建声音</div>
        <el-button class="voice-btn2" type="primary" icon="el-icon-plus" @click.stop="dialogVisible = true">新增</el-button>
      </div> -->
    </div>
    <!-- 新建声音样本弹窗 -->
    <el-dialog class="dialog"
               v-model="dialogVisible"
               title="新建声音样本"
               width="500px"
    >
      <el-form>
        <el-form-item label="声音名称">
          <el-input v-model="newVoiceName"></el-input>
        </el-form-item>
        <el-form-item label="上传声音">
          <el-upload
              action="#"
              list-type="text"
              :on-change="handleAudioChange"
              :auto-upload="false">
            <el-button class="btn1" type="primary">上传音频</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="现场录音">
          <el-button class="btn1" type="primary" @click="startRecording" v-if="!isRecording">开始录音</el-button>
          <el-button class="btn1" type="warning" @click="stopRecording" v-else>停止录音</el-button>
        </el-form-item>
        <el-form-item label="上传封面图片">
          <el-upload
              action="#"
              list-type="picture-card"
              :on-change="handleImageChange"
              :auto-upload="false"
          >
            <div class="upload-content">
              <i class="el-icon-plus"></i>
              <p>点击上传</p>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelDialog">取消</el-button>
          <el-button class="btn1" type="primary" @click="addVoice">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import eventBus from '@/eventBus';
// 定义自定义事件
// eslint-disable-next-line no-undef
const emit = defineEmits(['select-voice'])

const isCloned = ref(false)
const voices = ref([
  { name: '女老师', image: require('@/assets/static/女老师.jpg'), audio: require('@/assets/static/声音克隆/女老师输出2.0.wav') },
  { name: '小张学姐', image: require('@/assets/static/学姐.jpg'), audio: require('@/assets/static/声音克隆/小张输出.wav') },
  { name: '小女孩', image: require('@/assets/static/小女孩.jpg'), audio: require('@/assets/static/声音克隆/小女孩输出.wav') },
  { name: '温柔姐姐', image: require('@/assets/static/大姐姐.jpg'), audio: require('@/assets/static/声音克隆/温柔女声输出.wav') },
  { name: '男老师', image: require('@/assets/static/男老师.jpg'), audio: require('@/assets/static/声音克隆/男老师2.0输出.wav') },
  { name: '小杨学长', image: require('@/assets/static/学长.jpg'), audio: require('@/assets/static/声音克隆/小杨输出.wav') },
  { name: '小男孩', image: require('@/assets/static/小男孩.jpg'), audio: require('@/assets/static/声音克隆/小男孩输出.wav') },
  { name: '阳光男高', image: require('@/assets/static/男高.jpg'), audio: require('@/assets/static/声音克隆/阳光输出.wav') },
])
const standardvoices = ref([
  { name: '普通话_女',  audio: require('@/assets/static/标准音/标准女.wav'),languages: '中文' },
  { name: '普通话_男',  audio: require('@/assets/static/标准音/标准男.wav'),languages: '中文' },
  { name: '上海话_女',  audio: require('@/assets/static/标准音/标准女_上海话.wav'),languages: '中文' },
  { name: '上海话_男', audio: require('@/assets/static/标准音/标准男_上海话.wav'),languages: '中文' },
  { name: '四川话_女', audio: require('@/assets/static/标准音/标准女_四川话.wav') ,languages: '中文'},
  { name: '四川话_男',audio: require('@/assets/static/标准音/标准男_四川话.wav'),languages: '中文' },
  { name: '天津话_女',  audio: require('@/assets/static/标准音/标准女_天津话.wav'),languages: '中文' },
  { name: '天津话_男', audio: require('@/assets/static/标准音/标准男_天津话.wav'),languages: '中文' },
  { name: '粤语_女', audio: require('@/assets/static/标准音/标准女_粤语.wav') ,languages: '中文'},
  { name: '粤语_男',audio: require('@/assets/static/标准音/标准男_粤语.wav'),languages: '中文' },
  { name: '长沙话_女',  audio: require('@/assets/static/标准音/标准女_长沙话.wav'),languages: '中文' },
  { name: '长沙话_男', audio: require('@/assets/static/标准音/标准男_长沙话.wav'),languages: '中文' },
  { name: '郑州话_女', audio: require('@/assets/static/标准音/标准女_郑州话.wav') ,languages: '中文'},
  { name: '郑州话_男',audio: require('@/assets/static/标准音/标准男_郑州话.wav'),languages: '中文' },
  { name: '标准英音', audio: require('@/assets/static/audios/audio1.wav'),languages: '英语' },
  { name: '标准美音', audio: require('@/assets/static/audios/audio1.wav'),languages: '英语' },
  { name: '标准日语', audio: require('@/assets/static/audios/audio1.wav'),languages: '日语' },
  { name: '标准韩语', audio: require('@/assets/static/audios/audio1.wav'),languages: '韩语' },
])
const dialogVisible = ref(false)
const newVoiceName = ref('')
const newVoiceFile = ref(null)
const newVoiceCover = ref(null)
const selectedVoiceId = ref('')
let mediaRecorder = null
const audioChunks = ref([])
const isRecording = ref(false)
const currentLanguage = ref(eventBus.getLanguage());
// 监听语言变更事件
const updateCurrentLanguage = (lang) => {
  console.log('Language updated to:', lang); // 调试信息
  currentLanguage.value = lang;
};

onMounted(() => {
  eventBus.onLanguageChanged(updateCurrentLanguage);
});

// 动态过滤标准音样本
// eslint-disable-next-line no-unused-vars
const filteredStandardVoices = computed(() =>
    standardvoices.value.filter(voice => voice.languages.includes(currentLanguage.value.split('-')[0]))
);
const selectVoice = (voice) => {
  selectedVoiceId.value = voice.name
  emit('select-voice', voice)
}

const playVoice = (voice) => {
  const audio = new Audio(voice.audio)
  audio.play()
  ElMessage.info(`播放 ${voice.name}`)
}

const handleAudioChange = (file) => {
  newVoiceFile.value = file.raw
}

const handleImageChange = (file) => {
  newVoiceCover.value = file.raw
}

const startRecording = () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) {
            audioChunks.value.push(e.data)
          }
        }
        mediaRecorder.start()
        isRecording.value = true
      })
      .catch(err => console.error('获取麦克风权限失败:', err))
}

const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop()
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' })
      newVoiceFile.value = new File([audioBlob], `${newVoiceName.value}.wav`, { type: 'audio/wav' })
      audioChunks.value = []
      isRecording.value = false
    }
  }
}

// const addVoice = () => {
//   if (!newVoiceName.value || !newVoiceFile.value || !newVoiceCover.value) {
//     ElMessage.warning('请填写声音名称、上传或录制音频文件并上传封面图片')
//     return
//   }
//
//   const reader = new FileReader()
//   reader.onload = function(e) {
//     voices.value.push({
//       name: newVoiceName.value,
//       image: URL.createObjectURL(newVoiceCover.value),
//       audio: e.target.result
//     })
//   }
//   reader.readAsDataURL(newVoiceFile.value)
//
//   dialogVisible.value = false
//   resetForm()
// }
const addVoice = () => {
  if (!newVoiceName.value || !newVoiceFile.value || !newVoiceCover.value) {
    ElMessage.warning('请填写声音名称、上传或录制音频文件并上传封面图片')
    return
  }

  // 直接使用Blob对象创建对象URL，避免使用FileReader
  const audioUrl = URL.createObjectURL(newVoiceFile.value);

  voices.value.push({
    name: newVoiceName.value,
    image: URL.createObjectURL(newVoiceCover.value),
    audio: audioUrl // 使用直接生成的对象URL
  })

  dialogVisible.value = false
  resetForm()
}
const cancelDialog = () => {
  dialogVisible.value = false
  resetForm()
}

// eslint-disable-next-line no-unused-vars
const handleClose = (done) => {
  ElMessageBox.confirm('确定要关闭此对话框吗？')
      .then(() => {
        done()
        resetForm()
      })
      .catch(() => {})
}

const resetForm = () => {
  newVoiceName.value = ''
  newVoiceFile.value = null
  newVoiceCover.value = null
  audioChunks.value = []
}
</script>


<style scoped>
.switch-container{
  margin-left:20px;
  display:flex;

  align-items: center;
  color: #767A7D;
  font-size:18px;
  gap:10px;
}

/* 禁用状态（默认） */
:deep(.el-switch__core) {
  width:40px;
  height:10px;
  background-color: #E2E2E3 !important;
  border: none !important; /* 去掉边框 */
}

/* 启用状态 */
.el-switch.is-checked :deep(.el-switch__core) {
  background-color: #25AEBF !important;
}

.voice-selector {
  padding: 0px;

  .voice-list {
    border-top: 0.5px solid rgba(255,255,255,0.3);
    border-left: 0.5px solid rgba(255,255,255,0.3);
    box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);
    overflow-y: auto; /* 允许纵向滚动 */
    height:100%;
    margin-top:5px;
    display: flex;
    flex-wrap: wrap;
    background-color: rgba(60, 67, 75, 0.66);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    padding:10px 22px 10px 22px;
    .voice-item {
      margin: 10px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      cursor: pointer;
      .btn-container{
        display: flex;
        justify-content: center;
        align-items: center;
        gap:5px;
      }
      .voice-btn{
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      .voice-name {
        padding:5px 0px 5px 0px;
        font-size:14px;
      }
    }
    .voice-image {
      width: 100px;
      height: 100px;
      border-radius: 10%;
      object-fit: cover;
    }
    .voice-add{
      margin: 10px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      cursor: pointer;
      .voice-btn2{
        margin-top:5px;
        width:60px;
        height:25px;
        display: flex;
        align-items: center;
        background-color: #25AEBF;
        border:none;
      }
      .voice-name {
        padding:5px 0px 5px 0px;
        font-size:14px;
      }
    }
    .radio {
      position: absolute;
      top: 10px;
      left: 10px;
    }

    .voice-add {
      margin: 10px;
      cursor: pointer;
    }
  }
}
:deep(.el-dialog){
  padding:0;
}
:deep(.dialog .el-dialog__header) {
  background-color: #f0f0f0; /* 设置灰色背景 */
  text-align: center; /* 让标题居中 */
  padding: 10px; /* 调整内边距 */
  border-top-left-radius: 8px; /* 圆角优化 */
  border-top-right-radius: 8px;
}
.dialog .el-dialog__title {
  font-weight: bold; /* 标题加粗 */
  font-size: 18px; /* 调整字体大小 */
}
:deep(.dialog .el-dialog__body) {
  padding: 20px; /* 调整内边距 */
}
:deep(el-dialog__footer){
  margin-top:-20px;
}
.dialog-footer {
  padding: 20px 20px; /* 调整内边距 */
}
.btn1{
  background-color: #25AEBF;
  border:none;
}

</style>