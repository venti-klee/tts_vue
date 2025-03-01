<template>
  <div class="voice-selector">
    <!-- 克隆声音开关 -->
    <el-switch v-model="isCloned" active-text="克隆人声" inactive-text="标准音"></el-switch>

    <!-- 声音样本列表 -->
    <div class="voice-list">
      <div v-for="(voice, index) in voices" :key="index" class="voice-item" @click="selectVoice(voice)">
        <el-radio v-model="selectedVoiceId" :label="voice.name" class="radio">{{ '' }}</el-radio>
        <img :src="voice.image" alt="voice image" class="voice-image">
        <div class="voice-name">{{ voice.name }}</div>
        <el-button @click.stop="playVoice(voice)" type="primary" icon="el-icon-music">试听</el-button>
      </div>
      <div class="voice-add" @click="dialogVisible = true">
        <img :src="require('@/assets/static/加.png')" alt="add voice image" class="voice-image">
        <div class="voice-name">新建声音</div>
        <el-button type="primary" icon="el-icon-plus" @click.stop="dialogVisible = true">新增</el-button>
      </div>
    </div>

    <!-- 新建声音样本弹窗 -->
    <el-dialog
        v-model="dialogVisible"
        title="新建声音样本"
        width="500px"
        :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="声音名称">
          <el-input v-model="newVoiceName"></el-input>
        </el-form-item>
        <el-form-item label="上传声音文件">
          <el-upload
              action="#"
              list-type="text"
              :on-change="handleAudioChange"
              :auto-upload="false"
          >
            <el-button type="primary">上传音频</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="现场录音">
          <el-button type="primary" @click="startRecording" v-if="!isRecording">开始录音</el-button>
          <el-button type="warning" @click="stopRecording" v-else>停止录音</el-button>
        </el-form-item>
        <el-form-item label="上传封面图片">
          <el-upload
              action="#"
              list-type="picture-card"
              :on-change="handleImageChange"
              :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelDialog">取消</el-button>
          <el-button type="primary" @click="addVoice">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

// 定义自定义事件
// eslint-disable-next-line no-undef
const emit = defineEmits(['select-voice'])

const isCloned = ref(false)
const voices = ref([
  { name: '亲切女声', image: require('@/assets/static/vox.jpg'), audio: require('@/assets/static/audios/audio1.wav') },
  { name: '小张学姐', image: require('@/assets/static/vox.jpg'), audio: require('@/assets/static/audios/audio2.wav') },
])
const dialogVisible = ref(false)
const newVoiceName = ref('')
const newVoiceFile = ref(null)
const newVoiceCover = ref(null)
const selectedVoiceId = ref('')
let mediaRecorder = null
const audioChunks = ref([])
const isRecording = ref(false)

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
.voice-selector {
  padding: 20px;
}

.voice-list {
  display: flex;
  flex-wrap: wrap;
}

.voice-item {
  margin: 10px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.radio {
  position: absolute;
  top: 10px;
  left: 10px;
}

.voice-image {
  width: 100px;
  height: 100px;
  border-radius: 10%;
  object-fit: cover;
}

.voice-name {
  margin-top: 10px;
}

.voice-add {
  margin: 10px;
  cursor: pointer;
}
</style>