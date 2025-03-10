<template>
  <div>
    <!-- 筛选导航栏 -->
    <div class="main1">
      <el-row :gutter="20" type="flex" justify="start" align="middle" class="filter-bar">
        <el-col :span="16">
          <div class="filter-groups">
            <div class="filter-group">
              <span>教育阶段:</span>
              <button
                  v-for="stage in stages"
                  :key="stage"
                  :class="{'is-active': selectedStage === stage}"
                  @click="filterByStage(stage)">
                {{ stage }}
              </button>
            </div>

            <div class="filter-group">
              <span>语言语种:</span>
              <button
                  v-for="language in languages"
                  :key="language"
                  :class="{'is-active': selectedLanguage === language}"
                  @click="filterByLanguage(language)">
                {{ language }}
              </button>
            </div>
          </div>
        </el-col>

        <!-- 搜索框 -->
        <el-col :span="8"  class="search-container">
          <div class="search-group">
            <el-input
                v-model="searchQuery"
                placeholder="搜索书本名称..."
                clearable>
            </el-input>
            <button type="primary" @click="searchBooks" style="margin-left: 10px;">搜索</button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 筛选结果 -->
    <div class="total-books">
      {{ totalBooksText }}
    </div>

    <div class="book-display">
      <div class="book-row">
        <div v-for="book in displayedBooks" :key="book.id" >
          <div class="book-card" @click="selectBook(book)">
            <img :src="book.cover" class="book-cover" alt="Book Cover" />
            <div class="book-title">{{ book.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 翻页 -->
    <el-pagination class="pagination"
        background
        layout="prev, pager, next, jumper"
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
  { id: 1, title: '《新编大学英语》', cover: '/static/英语书/新编大学英语.jpeg', stage: '本科及以上', language: '英语' },
  { id: 2, title: '《大学英语口语教程》', cover: '/static/英语书/大学英语口语教程（下册）.jpg', stage: '本科及以上', language: '英语' },
  { id: 3, title: '《大学英语》', cover: '/static/英语书/大学英语.jpeg', stage: '本科及以上', language: '英语' },
  { id: 4, title: '《六级5500词逻辑辨证记忆》', cover: '/static/英语书/大学英语六级5500词逻辑辨证记忆.jpeg', stage: '本科及以上', language: '英语' },
  { id: 5, title: '《大学英语四级词汇手册》', cover: '/static/英语书/大学英语四级词汇手册.jpeg', stage: '本科及以上', language: '英语' },
  { id: 6, title: '《人教版八年级下英语书》', cover: '/static/英语书/人教版八年级下英语书.jpeg', stage: '初中', language: '英语' },
  { id: 7, title: '《人教版三年级上英语书》', cover: '/static/英语书/人教版三年级上英语书.png', stage: '小学', language: '英语' },
  { id: 8, title: '《人教版高中英语必修3》', cover: '/static/英语书/人教版高中英语必修3.jpeg', stage: '高中', language: '英语' },
  { id: 9, title: '《人教版高中英语选修9》', cover: '/static/英语书/人教版高中英语选修9.jpeg', stage: '高中', language: '英语' },
  { id: 10, title: '《英语四级词汇分频速记》', cover: '/static/英语书/英语四级词汇分频速记.jpg', stage: '本科及以上', language: '英语' },
]);
const displayedBooks = ref([]);
const pageSize = ref(8);
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
  return `共有 ${totalBooks.value} 个结果 。`;
});

const selectBook = (book) => {
  emit('select-book', book);
};

const emit = defineEmits(['select-book']);
</script>

<style scoped>
.main1{
  width:100%;
  padding:0px;
  margin-left:10px;
}
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position:relative;
  width:100%;
  margin-right:-20px;
  background-image: linear-gradient(to right, #25AEBF, #FFFFFF);
  padding: 15px 0 15px 40px;
  margin-bottom: 20px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  .filter-groups{
    gap:10px;
    display: flex; 
    flex-direction:column;
  }
  .filter-group {
    font-size:16px;
    display: flex;
    align-items: center;
    margin-right: 20px;
    button{
      margin-left:40px;
      background-color:transparent ;
      color: #767A7D;
      border:none;
    }
    button:hover{
      color:white;
    }
    button.is-active {
      margin-left:40px;
      background-color:transparent ;
      color: white;
      border:none;
    }
  }
  .search-container{
    display: flex;
    .search-group {
      display: flex;
      align-items: center;
      button{
        background-color:#25AEBF;
        width:80px;
        height:30px;
        border:none;
        color:white;
        font-size:14px;
        border-radius:5px;
      }
      button:hover{
        background-color:#1D94A4;
      }
    }
  }
}

.total-books {
  font-size: 14px;
  color: #767A7D;
  margin-bottom: 20px;
  margin-left:20px;
}
.book-display{
  width:100%;
  .book-row {
    padding-right:40px;  
    display:flex;
    flex-wrap: wrap;
    gap:40px 60px; 
    .book-card {
      width:180px;
      margin-left:10px;
      padding:10px 0px;
      border-radius: 5px;;
      background-color: #3C434B;
      border-top: 0.5px solid rgba(255,255,255,0.3);
      border-left: 0.5px solid rgba(255,255,255,0.3);
      box-shadow: 6px 6px 16px 0 rgba(255, 255, 255, 0.14), 3px 3px 6px -4px rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer; /* 鼠标悬停时显示为手型 */
      .book-cover {
        width: 120px;
        height:160px;
        object-fit: cover; /* 保持图片比例并填充容器 */
      }

      .book-title {
        font-size: 14px;
        color: white;
        margin-top:10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.pagination{
  margin-top:40px;
  margin-left:-40px;
  display:flex;
  justify-content: center;
  align-items: center;
}
/* 修改选中页码的颜色 */
::v-deep(.el-pager .number.is-active),
::v-deep(.el-pager .number:hover) {
  background-color: #25AEBF !important; /* 设置选中页码的字体颜色 */
  color:white;
  font-weight: bold; /* 可选，增加加粗效果 */
  margin: 0 10x; /* 页码间距 10px */
}
/* 设置页码之间的间隔 */
::v-deep(.el-pager .number) {
  margin: 0 2px; /* 页码间距 10px */
  transition: all 0.3s ease-in-out; 
}


</style>