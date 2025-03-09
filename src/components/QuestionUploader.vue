<template>
  <div class="upload-and-recognize">
    <!-- 图片上传组件 -->
    <el-upload
        class="upload-demo"
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
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #file="{ file }">
        <div :class="{'selected': isSelected(file)}" @click="selectImageByFile(file)">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click.stop="handlePictureCardPreview(file)">
              <el-icon><ZoomIn /></el-icon>
            </span>
            <span class="el-upload-list__item-delete" @click.stop="handleRemove(file)">
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <!-- 识别出的错题列表 -->
    <div v-if="recognizedQuestions.length > 0" class="recognized-questions">
      <h2>识别错题</h2>
      <div v-for="(question, qIndex) in recognizedQuestions" :key="qIndex" class="question">
        <label>
          <input type="radio" :value="question" v-model="selectedQuestion" @change="onQuestionSelected(question)"/>
          <!-- 使用 v-html 来显示 question.text -->
          <div class="math-content" ref="textContent" v-html="convertToInlineMath(question.text)"></div>
          <div class="math-content" ref="answerContent" v-html="convertToInlineMath(question.answer)"></div>
          <img :src="question.imgurl" alt="题目图片"/>
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
          { text: '原解：C 正解：A', answer: '$3x^{-2} = \\frac{1}{3x^2}$', imgurl: "/static/错题/错题1(1).jpg" },
          { text: '原解：$2^{4}$ 正解：$2^{8}$', answer: '正确答案是$2^{8}$', imgurl: "/static/错题/错题1(2).jpg" },
          { text: '原解：7 正解：$-a^{8}b^{3}$', answer: '正确答案是$-a^{8}b^{3}$', imgurl: "/static/错题/错题1(3).jpg"},
          {text: '原解：无法识别 正解：$9x^{2}$', answer: '正确答案是$9x^{2}$', imgurl: "/static/错题/错题1(4).jpg"},
        ],
        "错题2.jpg": [
          {text: '原解：$2^{4}$ 正解：$2^{8}$', answer: '正确答案是$2^{8}$'},
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

<style scoped>
.upload-and-recognize {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 选中状态下的边框颜色 */
.selected {
  border: 2px solid #409eff !important;
}

.recognized-questions {
  margin-top: 20px;
}
</style>