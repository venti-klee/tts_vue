<template>
  <div class="main-contant">
    <p class="tip">
      *请上传单个PDF文件，重复上传将会覆盖之前的文件
    </p>
    <!-- ✅ 绿色提示：上传成功后显示 -->
    <p v-if="uploadSuccess" class="success-tip">
      {{ uploadedFileName }} 上传成功
    </p>
    <!-- 使用 Element Plus 的 Upload 组件 -->
    <el-upload v-if="!isPdf"
        class="upload-demo"
        drag
        action="#"
        :on-change="handleChange"
        :auto-upload="false"
        :limit="1"
        :on-exceed="handleExceed"
        ref="upload"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        <img class="upload-icon" src="/static/上传.png" alt="pic"><br>
        将文件拖到此处 <br>-或-<br> 
        <em>点击上传</em>
      </div>
        
    </el-upload>

      <!-- 显示 PDF 文件 -->
      <div v-if="isPdf">
        <div class="pdf-preview" v-loading="loading" element-loading-text="正在加载中..." element-loading-background="rgba(122, 122, 122, 0.0)">
          <vue-pdf-embed :source="pdfUrl" @loaded="handleDocumentLoaded" />
        </div>
<!--        <div class="page-tool">-->
<!--          <div class="page-tool-item" @click="prevPage">上一页</div>-->
<!--          <div class="page-tool-item">{{ currentPage }} / {{ numPages }}</div>-->
<!--          <div class="page-tool-item" @click="nextPage">下一页</div>-->
<!--        </div>-->
      </div>
    </div>
<!--  </div>-->
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {ref, reactive, onMounted} from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';

export default {
  components: {
    VuePdfEmbed,
  },
  data() {
    return {
      fileInfo: null,
      pdfUrl: '',
      loading: false,
      numPages: 0,
      currentPage: 1,
      uploadSuccess: false, //添加上传成功的标志
      uploadedFileName: '',
    };
  },
  computed: {
    isPdf() {
      return this.fileInfo && this.fileInfo.raw.type === 'application/pdf';
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleChange(file, fileList) {
      // 清除之前的文件列表以允许覆盖
      this.$refs.upload.clearFiles();

      // 更新 fileInfo 数据
      this.fileInfo = file;
      this.uploadedFileName = file.name;
      this.uploadSuccess = true;

      if (this.isPdf) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.pdfUrl = e.target.result;
          this.loading = true;
        };
        fileReader.readAsDataURL(this.fileInfo.raw);
      }
    },
    handleDocumentLoaded(pdf) {
      this.numPages = pdf.numPages;
      this.loading = false;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.numPages) {
        this.currentPage += 1;
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    formatFileSize(size) {
      return size / 1024 / 1024 > 1
          ? `${(size / 1024 / 1024).toFixed(2)} MB`
          : `${(size / 1024).toFixed(2)} KB`;
    },
  },
};
</script>

<style scoped>
.main-contant{
  position:relative;
}
.success-tip {
  position:absolute;
  top:-25px;
  left:5px;
  color: #4CAF50; /* 绿色 */
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 0px;
}

::v-deep .el-upload-dragger{
  background-color: #767A7D;
  border:none;
  width:100%;
  height:160px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  height:605px;
}
::v-deep .el-upload__text{
  color:white;
}
.upload-icon{
  width:23px;
  height:23px;
}
.tip{
  position:absolute;
  z-index:99;
  font-size:14px;
  color:#d0d2d483;
  right:5px;
  top:-25px;
  height:25px;
  z-index:999;
}
/* 添加一些自定义样式 */
.upload-demo {
  margin-top:35px;
}

.file-info {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f9fafc;
}

.pdf-preview {
  width: 100%;
  height: 600px;
  overflow-y: auto;
  position: relative;
  margin-bottom:10px;
  margin-top:35px;
}

.page-tool {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.page-tool-item {
  margin: 0 10px;
  cursor: pointer;
}
</style>