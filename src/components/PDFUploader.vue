<template>
  <div>
    <!-- 使用 Element Plus 的 Upload 组件 -->
    <el-upload
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
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__text">
          支持扩展名：.pdf（请上传单个PDF文件，重复上传将会覆盖）
        </div>
      </template>
    </el-upload>

    <!-- 展示已上传的文件信息和PDF预览 -->
<!--    <div v-if="fileInfo" class="file-info">-->
<!--      <h3>已上传文件信息：</h3>-->
<!--      <p>名称：{{ fileInfo.name }}</p>-->
<!--      <p>大小：{{ formatFileSize(fileInfo.size) }}</p>-->
<!--      <p>类型：{{ fileInfo.raw.type }}</p>-->

      <!-- 显示 PDF 文件 -->
      <div v-if="isPdf">
        <h4>预览：</h4>
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
/* 添加一些自定义样式 */
.upload-demo {
  width: 360px;
  margin: auto;
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