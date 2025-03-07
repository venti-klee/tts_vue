<template>
  <div>
    <span>发音练习</span>
    <BookSearch v-if="!selectedBook" @select-book="handleSelectBook" />
    <BookDetails v-if="selectedBook" :selected-book="selectedBook" @select-book="BackSelectBook"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BookSearch from "@/components/BookSearch.vue";
import BookDetails from "@/components/BookDetails.vue";

const selectedBook = ref(null);

const handleSelectBook = (book) => {
  selectedBook.value = book;
};
const BackSelectBook = () => {
  selectedBook.value = null;
};
</script>

<style scoped>
/* 添加样式 */
</style>