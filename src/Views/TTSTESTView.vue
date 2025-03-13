<template>
  <div>
    <BookSearch class="book-search-container" v-if="!selectedBook" @select-book="handleSelectBook" />
    <BookDetails class="book-details-container" v-if="selectedBook" :selected-book="selectedBook" 
      @select-book="BackSelectBook"
      @recording-complete="emit('recording-complete')" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BookSearch from "@/components/BookSearch.vue";
import BookDetails from "@/components/BookDetails.vue";

const selectedBook = ref(null);
const showRecommendation = ref(false);
const emit = defineEmits(['recording-complete']); // 事件继续向上传递

const handleSelectBook = (book) => {
  selectedBook.value = book;
};
const BackSelectBook = () => {
  selectedBook.value = null;
};
// 当录音 5 次后，显示推荐书籍
const showRecommendations = () => {
  showRecommendation.value = true;
  console.log("以达到5次录音");
};
</script>

<style scoped>
.book-search-container{
  margin-left:40px;
}
.book-details-container{
  margin-left:40px;
  background-color: transparent;
}
</style>