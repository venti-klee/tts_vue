<template>
  <div>
    <div class="filter-bar">
      <el-row :gutter="20" type="flex" justify="start" align="middle">
        <el-col :span="16">
          <div class="filter-group">
            <span>教育阶段:</span>
            <el-button
                v-for="stage in stages"
                :key="stage"
                :class="{'is-active': selectedStage === stage}"
                @click="filterByStage(stage)">
              {{ stage }}
            </el-button>
          </div>
          <div class="filter-group">
            <span>语言语种:</span>
            <el-button
                v-for="language in languages"
                :key="language"
                :class="{'is-active': selectedLanguage === language}"
                @click="filterByLanguage(language)">
              {{ language }}
            </el-button>
          </div>
        </el-col>
        <el-col :span="8" style="display: flex; align-items: center;">
          <div class="search-group">
            <el-input
                v-model="searchQuery"
                placeholder="搜索书本名称"
                clearable>
            </el-input>
            <el-button type="primary" @click="searchBooks" style="margin-left: 10px;">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="total-books">
      {{ totalBooksText }}
    </div>

    <div class="book-display">
      <el-row :gutter="20" class="book-row">
        <el-col v-for="book in displayedBooks" :key="book.id" :span="4">
          <el-card shadow="hover" class="book-card" @click="selectBook(book)">
            <img :src="book.cover" class="book-cover" alt="Book Cover" />
            <div class="book-title">{{ book.title }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-pagination
        background
        layout="prev, pager, next"
        :total="totalBooks"
        :page-size="pageSize"
        @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const stages = ref(['小学', '初中', '高中', '本科及以上', '留学', '全部']);
const languages = ref(['中文', '英语', '日语', '韩语', '全部']);
const selectedStage = ref('全部');
const selectedLanguage = ref('全部');
const searchQuery = ref('');
const books = ref([
  { id: 1, title: '新编大学英语', cover: '/static/英语书/新编大学英语.jpeg', stage: '本科及以上', language: '英语' },
  { id: 2, title: '大学英语口语教程', cover: '/static/英语书/大学英语口语教程（下册）.jpg', stage: '本科及以上', language: '英语' },
  { id: 3, title: '大学英语', cover: '/static/英语书/大学英语.jpeg', stage: '本科及以上', language: '英语' },
  { id: 4, title: '大学英语六级5500词逻辑辨证记忆', cover: '/static/英语书/大学英语六级5500词逻辑辨证记忆.jpeg', stage: '本科及以上', language: '英语' },
  { id: 5, title: '大学英语四级词汇手册', cover: '/static/英语书/大学英语四级词汇手册.jpeg', stage: '本科及以上', language: '英语' },
  { id: 6, title: '新思路大学英语', cover: '/static/英语书/新思路大学英语.jpeg', stage: '本科及以上', language: '英语' },
  { id: 7, title: 'English Vocabulary in Use', cover: '/static/英语书/English Vocabulary in Use.jpeg', stage: '本科及以上', language: '英语' },
]);
const displayedBooks = ref([]);
const pageSize = ref(5);
const currentPage = ref(1);

const totalBooks = computed(() => displayedBooks.value.length);

displayedBooks.value = books.value;

const filterByStage = (stage) => {
  selectedStage.value = stage;
  updateDisplayedBooks();
};

const filterByLanguage = (language) => {
  selectedLanguage.value = language;
  updateDisplayedBooks();
};

const searchBooks = () => {
  displayedBooks.value = books.value.filter(book =>
      book.title.includes(searchQuery.value) &&
      (selectedStage.value === '全部' || book.stage === selectedStage.value) &&
      (selectedLanguage.value === '全部' || book.language === selectedLanguage.value)
  );
  currentPage.value = 1; // Reset to first page after searching
};

const updateDisplayedBooks = () => {
  displayedBooks.value = books.value.filter(book =>
      (selectedStage.value === '全部' || book.stage === selectedStage.value) &&
      (selectedLanguage.value === '全部' || book.language === selectedLanguage.value)
  );
  currentPage.value = 1; // Reset to first page after filtering
};

const handlePageChange = (page) => {
  currentPage.value = page;
  const start = (page - 1) * pageSize.value;
  const end = start + pageSize.value;
  displayedBooks.value = books.value.slice(start, end).filter(book =>
      (selectedStage.value === '全部' || book.stage === selectedStage.value) &&
      (selectedLanguage.value === '全部' || book.language === selectedLanguage.value)
  );
};

const totalBooksText = computed(() => {
  return `共有 ${totalBooks.value} 本书籍`;
});

const selectBook = (book) => {
  emit('select-book', book);
};

const emit = defineEmits(['select-book']);
</script>

<style scoped>
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f8ff;
  padding: 10px;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.search-group {
  display: flex;
  align-items: center;
}

.is-active {
  background-color: #409eff;
  color: white;
}

.total-books {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}

.book-card {
  width: 100%;
  height: 200px; /* 固定卡片高度 */
  border: none; /* 移除卡片边框 */
  box-shadow: none; /* 移除卡片阴影 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px; /* 增加卡片之间的垂直间距 */
  cursor: pointer; /* 鼠标悬停时显示为手型 */
}

.book-cover {
  width: 100%;
  height: 150px; /* 固定图片高度 */
  object-fit: cover; /* 确保图片覆盖整个卡片 */
}

.book-title {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-row {
  margin-bottom: 20px; /* 增加行与行之间的垂直间距 */
}
</style>