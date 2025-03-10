<template>
  <img class="goback-img" src="/static/返回2.png" @click="goBack" alt="pic">
  <div class="book-details">
    <!-- header导航栏 -->
    <el-row :gutter="20" type="flex" justify="start" align="middle" class="filter-bar">
      <p>{{ selectedBook.title }}</p>
    </el-row>

    <!-- 单词和句子 -->
    <div class="content">
      <div class="section">
        <p class="title">单词</p>
        <word-practice></word-practice>
      </div>

      <div class="section">
        <p class="title">句子</p>
        <sentence-practice></sentence-practice>
      </div>
    </div>

    <!--评分说明-->
    <div class="score-tip">
      <el-popover placement="top" effect="light" trigger="hover" width="300">
        <!-- 弹出框内容 -->
        <template #default>
          <div class="popover-content">
            <!-- 上半部分：3个小圆点 + 分数说明 -->
            <div class="score-indicator">
              <div class="score-text">
                <p>
                  <span class="circle excellent"></span>
                  <span class="excellent-text">8.0-10</span> 优秀
                </p>
                <p>
                  <span class="circle good"></span>
                  <span class="good-text">6.0-7.9</span> 良好
                </p>
                <p>
                  <span class="circle fail"></span>
                  <span class="fail-text">0.0-5.9</span> 不合格
                </p>
              </div>
            </div>
            <!-- 下半部分：详细评分说明 -->
            <div class="score-description">
              评分标准：系统根据用户发音的准确度、流利度等多方面评估，提供客观的打分。
            </div>
          </div>
        </template>

        <!-- 触发按钮 -->
        <template #reference>
          <button class="score-btn">ⓘ&nbsp;评分说明</button>
        </template>
      </el-popover>
    </div>

    <!-- 推荐词典 -->
    <div class="recommendations">
      <p>为您推荐：</p>
      <ul class="recommed-item">
        <li v-for="book in recommendedBooks" :key="book.id">
          《{{ book.title }}》
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import WordPractice from "@/components/WordPractice.vue";
import SentencePractice from "@/components/SentencePractice.vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  selectedBook: Object
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

.goback-img{
  width: 45px;
  height:40px;
  margin-top:20px;
  margin-left:20px;
}
.book-details {
  padding: 0px;
  margin-left:50px;
  margin-right:10px;
  .filter-bar {
    top:0;
    height:87px;
    font-size:20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position:absolute;
    width:93%;
    right:10px;
    background-image: linear-gradient(to right, #25AEBF, #FFFFFF);
    padding: 15px 0 15px 40px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .content {
    background-color: transparent !important; /* 临时测试 */
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-right:40px;
    right:40px;
    padding-right:40px;
    .section {
      margin-right:40px;
      width: 48%;
      .title{
        margin-left:30px;
        font-size: 18px;
        border:1px solid white;
        border-radius: 12px;
        width:90px;
        height:30px;
        display:flex;
        justify-content: center;
        align-items: center;
      }
    }
    .pattern-card{
      height:470px;
      margin-top:20px;
      color:white;
      border-radius: 10px;
      border:none;
      padding:10px 10px 10px 10px;
      backdrop-filter: blur(5px);
      background-color:rgba(60, 67, 75, 0.66);
      border-top: 0.5px solid rgba(255,255,255,0.3);
      border-left: 0.5px solid rgba(255,255,255,0.3);
      box-shadow: -6px -6px 16px 0 rgba(255, 255, 255, 0.14), -3px -3px 6px -4px rgba(255, 255, 255, 0.08);
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      padding:10px 20px;
      overflow-y: auto;
    }
  }
  .score-tip{
    background-color: transparent!important; /* 临时测试 */
    .score-btn{
      color:#A2A4A5;
      background-color: transparent!important; /* 临时测试 */
      border:none;
      position:absolute;
      right:80px;
      bottom:60px;
      z-index:999;
      font-size:14px;
    }
  }
  .recommendations {
    margin-top: 30px;
    display:flex;
  }
  .recommed-item{
    display:flex;
    margin-left:10px;
    gap:10px;
    font-size:16px;
  }
}
.popover-content{
  padding: 05px;
  text-align: left;
}
/* 上半部分：分数指标 */
.score-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

/* 小圆点样式 */
.circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.excellent {
  background-color: #F65312; /* 优秀 */
}

.good {
  background-color: #FA862B; /* 良好 */
}

.fail {
  background-color: #25AEBF; /* 不合格 */
}

/* 评分文字 */
.score-text p {
  margin: 2px 0;
  font-size: 14px;
  gap:10px;
}

.excellent-text {
  color: #F65312;
  font-weight: bold;
  margin-left:10px;
  margin-right:5px;
}

.good-text {
  color: #FA862B;
  font-weight: bold;
  margin-left:10px;
  margin-right:5px;
}

.fail-text {
  color: #25AEBF;
  font-weight: bold;
  margin-left:10px;
  margin-right:5px;
}

/* 下半部分：评分说明 */
.score-description {
  font-size: 14px;
  color: #666;
  border-top: 1px solid #ddd;
  padding-top: 8px;
}

</style>