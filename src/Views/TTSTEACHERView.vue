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
    <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14" >
      <question-uploader  @question-selected="handleQuestionSelected"></question-uploader>

    </el-col>
      <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" >
<!--        <question-express :selectedQuestion="selectedQuestion"></question-express>-->
        <question-expresscopy :selectedQuestion="selectedQuestion" ></question-expresscopy>
      </el-col>

  </el-row>
</template>

<style scoped>

</style>