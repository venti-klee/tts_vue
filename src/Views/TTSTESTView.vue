<template>
  <div>
    <BookSearch class="book-search-container" v-if="!selectedBook" @select-book="handleSelectBook" />
    <BookDetails class="book-details-container" v-if="selectedBook" :selected-book="selectedBook" @select-book="BackSelectBook"/>
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
.book-search-container{
  margin-left:40px;
}
.book-details-container{
  margin-left:40px;
  background-color: transparent;
}
</style>