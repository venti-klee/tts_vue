<template>
  <div class="upload-and-recognize">
    <!-- 图片上传组件 -->
    <span>上传错题</span>
    <p class="tip2">*选择一张图片提取错题</p>
    <div class="upload-demo">
      <el-upload
          action=""
          :auto-upload="false"
          :on-change="handleChange"
          :before-remove="handleRemove"
          :file-list="fileList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          multiple
      >
        
        <el-icon><Plus /></el-icon>
        <template #file="{ file }" >
          <div class="img-item">
            <div :class="{'selected': isSelected(file)}" @click="selectImageByFile(file)">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""
                style="padding:0px;display:flex;align-items: center;justify-content: center;"
              >
              <!-- 预览和删除 -->
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click.stop="handlePictureCardPreview(file)">
                  <el-icon class="incon1"><ZoomIn /></el-icon>
                </span>
                <span class="el-upload-list__item-delete" @click.stop="handleRemove(file)">
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </div>  
        </template>
      </el-upload>
    </div>
    
    <!-- 图片预览对话框 -->
    <el-dialog v-model="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <div class="question-list">
        <!-- 识别出的错题列表 -->
      <span>识别错题</span>
      <p class="tip3">*请选择一道错题进行AI教师解析</p>
    </div>
    <div class="recognized-questions">
      <div class="question" v-for="(question, qIndex) in recognizedQuestions" :key="qIndex">
        <label :class="{ selected: selectedQuestion === question }">
          <input type="radio" :value="question" v-model="selectedQuestion" @change="onQuestionSelected(question)"/>
          <!-- 使用 v-html 来显示 question.text -->
          <img :src="question.imgurl" alt="题目图片"/>
          <div class="answers">
            <div class="math-content" ref="textContent" v-html="convertToInlineMath(question.text)"></div>
          </div>
            
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";

export default {
  components: { Delete, ZoomIn, Plus },
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      selectedFileUid: null,
      recognizedQuestions: [],
      selectedQuestion: null, // 用于存储当前选中的问题
    };
  },
  methods: {
    onQuestionSelected(question) {
      this.selectedQuestion = question;
      this.$nextTick(() => {
        this.renderMathJax();
      });
      this.$emit('question-selected', question);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.map(f => ({ ...f }));
    },
    handleRemove(file) {
      this.fileList = (this.fileList || []).filter(f => f.uid !== file.uid);

      if (this.selectedFileUid === file.uid) {
        this.selectedFileUid = null; // 清除当前选中的图片uid
        this.recognizedQuestions = []; // 清空识别结果
        this.selectedQuestion = null; // 清除选中的问题
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    selectImageByFile(file) {
      const index = this.fileList.findIndex(f => f.uid === file.uid);
      this.selectImage(index, file);
    },
    selectImage(index, file) {
      console.log("Selected image:", file.name); // 调试信息
      this.selectedFileUid = file.uid;
      this.recognize(file);
    },
    recognize(file) {
      console.log("Recognizing for:", file.name); // 调试信息

      const questionsMap = {
        "错题1.jpg": [
          { text: '原解：C &nbsp;&nbsp;正解：A', answer: '正确答案：$3x^{-2} = \\frac{1}{3x^2}$', imgurl: "/static/错题/错题1(1).jpg" },
          { text: '原解：$2^{4}$ &nbsp;&nbsp;正解：$2^{8}$', answer: '正确答案：$2^{8}$', imgurl: "/static/错题/错题1(2).jpg" },
          { text: '原解：7 &nbsp;&nbsp;正解：$-a^{8}b^{3}$', answer: '正确答案：$-a^{8}b^{3}$', imgurl: "/static/错题/错题1(3).jpg"},
          { text: '原解：&nbsp; &nbsp;&nbsp;正解：$9x^{2}$', answer: '正确答案：$9x^{2}$', imgurl: "/static/错题/错题1(4).jpg"},
        ],
        "错题2.jpg": [
          {text: '原解：$2^{4}$ 正解：$2^{8}$', answer: '正确答案:$2^{8}$'},
        ],
      };

      const fileName = file.name || 'unknown'; // 如果没有文件名，则使用'unknown'
      const questions = questionsMap[fileName] || [];
      this.recognizedQuestions = questions;

      console.log("Recognized Questions:", this.recognizedQuestions); // 调试信息
    },
    isSelected(file) {
      return this.selectedFileUid === file.uid;
    },
    renderMathJax() {
      if (window.MathJax && this.$refs.textContent && this.$refs.answerContent) {
        // 使用Promise.all等待所有的MathJax渲染完成
        Promise.all(
            Array.from(this.$refs.textContent).concat(Array.from(this.$refs.answerContent)).map(element =>
                window.MathJax.typesetPromise([element])
            )
        ).then(() => {
          console.log('All math content rendered');
        }).catch((err) => console.error('MathJax rendering error:', err));
      }
    },
    convertToInlineMath(text) {
      // 这里假设所有需要转换的部分都已经用 $ 包围，所以直接返回即可
      return text;
    }
  },
  mounted() {
    // 确保页面加载完成后等待MathJax加载完毕再进行初次渲染
    window.MathJax && window.MathJax.typesetPromise().then(() => {
      if (this.recognizedQuestions.length) {
        this.$nextTick(() => {
          this.renderMathJax();
        });
      }
    });
  }
};
</script>

<style>
.tip2{
  position:absolute;
  z-index:99;
  font-size:14px;
  color:#767A7D;
  margin-top:18px;
  left:480px;
  height:25px;
}
.tip3{
  position:absolute;
  z-index:99;
  font-size:14px;
  color:#767A7D;
  top:10px;
  left:390px;
  height:25px;
}
.upload-and-recognize {
  display: flex;
  flex-direction: column;
  width:100%;
  span{
    background-color:transparent;
    color:#767A7D;
    font-size:18px;
    margin-left:20px;
    margin-top:8px;
    margin-bottom:0px;
  }
  .upload-demo{
    overflow-y: auto;
    margin-top:10px;
    resize: none;
    width: 100%;
    height:200px;
    max-width: 680px;
    background-color:rgba(60, 67, 75, 0.66);
    color:white;
    border-radius: 10px;
    border:none;
    padding:20px 30px;
    backdrop-filter: blur(5px);
    border-top: 0.5px solid rgba(255,255,255,0.3);
    border-left: 0.5px solid rgba(255,255,255,0.3);
    box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);
    margin-left:0;
    display: flex;
    /* 图片选中状态下的边框颜色 */
    .selected {
      border: 2px solid #1D94A4 !important;
    }
    img{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /* 预览和删除 */
    .el-upload-list__item-actions {
      width: 100%;
      height: 100%;
      display: flex;
      padding:0;
      margin:0;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      .el-upload-list__item-preview{
        margin-left: -5px;
      }
      .incon1{
        width:50px !important;
        height:50px ! important;
        color:white;
        margin-left:-10px;
      }
    }
    .el-upload-list__item:hover .el-upload-list__item-actions {
      opacity: 1; /* 悬浮时显示删除按钮 */
    }
    .el-upload-list__item-delete {
      font-size: 24px;
      color: white;
      cursor: pointer;
    }
  }
}

.question-list{
  position :relative;
  margin-top:10px;
  width: 680px !important;
}
.recognized-questions {
  overflow-y: auto;
  margin-top:10px;
  resize: none;
  width: 100%;
  height:310px;
  max-width: 680px;
  background-color:rgba(60, 67, 75, 0.66);
  color:white;
  border-radius: 10px;
  border:none;
  padding:20px 30px;
  backdrop-filter: blur(5px);
  border-top: 0.5px solid rgba(255,255,255,0.3);
  border-left: 0.5px solid rgba(255,255,255,0.3);
  box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);
  margin-left:0;
  .question{
    display:flex;
    flex-direction: column;
    label.selected {
      background-color: rgba(118, 122, 125, 0.47);
      border:none;
      border-radius: 0;
    }
    label{
      padding:20px 5px;
      display: flex;
      align-items: center;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;
      input{
        margin-top:5px;
      }
      display:flex;
      margin-left:0;
      img{
        width:300px;
        margin-left:15px;
      }
      .answers{
        display: flex;
        flex-direction: column;
        margin-top:5px;
        margin-left:10px;
        gap:10px;
      }
    }
  }
}
</style>