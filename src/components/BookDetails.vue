<template>
  <div class="book-details">
    <div class="header">
      <el-button icon="el-icon-arrow-left" @click="goBack" circle>返回</el-button>
      <h2>{{ selectedBook.title }}</h2>
    </div>

    <div class="content">
      <div class="section">
        <h3>单词</h3>
        <ul>
          <li v-for="(word, index) in words" :key="index">
            <span>{{ word }}</span>
            <span>{{ pronunciation[word] }}</span>
          </li>
        </ul>
        <word-practice></word-practice>
      </div>
      <div class="section">
        <h3>句子</h3>
        <ul>
          <li v-for="(sentence, index) in sentences" :key="index">
            <span>{{ sentence }}</span>
            <span>{{ pronunciation[sentence] }}</span>
          </li>
        </ul>
      </div>
    </div>
<!--    评分说明-->
<div>
  <el-tooltip content="9.0-10优秀,6.0-8.9良好 0.0-5.9不合格" placement="top" effect="light">
    <el-button>ⓘ评分说明</el-button>
  </el-tooltip>

</div>
    <div class="recommendations">
      <h3>为您推荐:</h3>
      <ul>
        <li v-for="book in recommendedBooks" :key="book.id">
          {{ book.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import WordPractice from "@/components/WordPractice.vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  selectedBook: Object
});

const words = ref(['abandon', 'example', 'word']);
const sentences = ref(['One apple a day. Doctor, stay away from me.']);
const pronunciation = ref({
  abandon: '5.5',
  'One apple a day. Doctor, stay away from me.': '8.5'
});
const recommendedBooks = ref([
  { id: 1, title: '英语六级重难点词汇' },
  { id: 2, title: '英语六级就看他' },
  { id: 3, title: '六级背词神器' }
]);

const goBack = () => {
    emit('select-book');
};

const emit = defineEmits(['select-book']);
</script>

<style scoped>
.book-details {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  margin-left: 10px;
}

.content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section {
  width: 48%;
}

.recommendations {
  margin-top: 20px;
}

.el-button {
  margin-right: 10px;
}
</style>