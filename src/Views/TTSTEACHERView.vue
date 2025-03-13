<script setup>
import QuestionUploader from "@/components/QuestionUploader.vue";
// import QuestionExpress from "@/components/QuestionExpress.vue";
import {ref} from "vue";
import QuestionExpresscopy from "@/components/QuestionExpresscopy.vue";
const selectedQuestion = ref(null);

const handleQuestionSelected = (question) => {
  selectedQuestion.value = question;
};
</script>

<template>
  <el-row>
    <el-col :xs="24" :sm="10" :md="10" :lg="13" :xl="10" >
      <question-uploader  class="question-uploader-container" @question-selected="handleQuestionSelected"></question-uploader>
    </el-col>
      <el-col :xs="24" :sm="10" :md="10" :lg="9" :xl="10" >
          <question-expresscopy class="question-expresscopy-container" :selectedQuestion="selectedQuestion" ></question-expresscopy>

      </el-col>

  </el-row>
</template>

<style scoped>
.question-uploader-container{
  margin-left:40px;
  width:550px;
  margin-top:15px;
}
.question-expresscopy-container{
  margin-left:30px;
  width:100%;
  margin-top:0px;
  padding-top:20px;
}
</style>