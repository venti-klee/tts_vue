<template>
  <div>
    <div class="prop">
      <el-popover v-model:visible="showPopup"  effect="light" trigger="manual" width="350">
        <template #default>
          <p>为您推荐：</p>
          <ul class="recommend-item">
            <li class="book-item" v-for="book in recommendedBooks" :key="book.id">
              <img :src="book.imgUrl" alt="book" style="width:90px;height:120px"/>
              {{ book.title }}
            </li>
          </ul>
          <button class="close-btn" @click="closePopup">我知道了</button>
        </template>
        <!-- 触发按钮 -->
        <template #reference>
          <!-- 悬浮球 -->
          <div
              class="floating-ball"
              :style="{
              top: `${top}px`,
              left: `${left}px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundImage: `url(${imageUrl})`,
              animation: shaking ? 'shake 0.1s infinite' : 'none'
            }"
              @mousedown="startDrag"
              @touchstart="startDrag"
              @mouseenter="showFullBall"
              @mouseleave="hideBall"
              @click="toggleDrawer"
          >
        </div>
        </template>
      </el-popover>
    </div>
    <div class="prop">
      <el-popover v-model:visible="showPopup1"  effect="light" trigger="manual" width="500">
        <template #default>
          <p>为您推荐：</p>
          <ul class="recommend-item">
            <li class="book-item" v-for="book in recommendedExercises" :key="book.id">
              <img :src="book.imgUrl" alt="book" style="width:90px;height:120px"/>
              {{ book.title }}
            </li>
          </ul>
          <div class="recommend-list">
            <p class="p1">您的数学基础知识有点薄弱，在
              <span class="p2">指数运算法则、分数的基本性质、有理数的乘方</span> 
            等初中数学知识点上有所缺陷。</p>
            <p class="p1">建议您优先巩固基础知识，可以通过以上推荐的数学习题练习，或者通过一些
              适合中学生的学习网站进行学习。以下是一些推荐学习网站：</p>
            <ul class="recommend-item1">
              <li class="web-item" v-for="web in webs" :key="web.id">
                {{ web.id }}、{{ web.name }}：{{ web.url }}
              </li>
            </ul>
            <p class="p1">希望对您有所帮助！有任何问题可以随时咨询我~</p>
          </div>
          <button class="close-btn" @click="closePopup1">我知道了</button>
        </template>
        <!-- 触发按钮 -->
        <template #reference>
          <!-- 悬浮球 -->
          <div
              class="floating-ball"
              :style="{
              top: `${top}px`,
              left: `${left}px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundImage: `url(${imageUrl})`,
              animation: shaking ? 'shake 0.1s infinite' : 'none'
            }"
              @mousedown="startDrag"
              @touchstart="startDrag"
              @mouseenter="showFullBall"
              @mouseleave="hideBall"
              @click="toggleDrawer"
          >
        </div>
        </template>
      </el-popover>
    </div>

    <!-- 抽屉 -->
    <el-drawer v-model="drawerVisible" title="聊天窗口" size="50%">
      <iframe :src="embedUrl" style="width:100%; height:100%; border:none;" />
    </el-drawer>
  </div>
</template>

<script setup>
import {ref, watchEffect } from "vue";
import {ElDrawer} from "element-plus";
import { useRoute } from "vue-router";
const showPopup = ref(false);
const showPopup1 = ref(false);
const recommendedBooks = ref([
  { id: 1, title: "《词汇分频速记》",imgUrl:"/static/英语书/英语四级词汇分频速记.jpg" },
  { id: 2, title: "《新思路大学英语》",imgUrl:"/static/英语书/新思路大学英语.jpeg" },
  { id: 3, title: "《大学英语》",imgUrl:"/static/英语书/大学英语.jpeg" },
]);

const recommendedExercises = ref([
  { id: 1, title: "《5·3初中数学》",imgUrl:"/static/数学书/数学1.jpeg" },
  { id: 2, title: "《初中必刷题(数学)》",imgUrl:"/static/数学书/数学2.jpg" },
  { id: 3, title: "《步步通优(数学)》",imgUrl:"/static/数学书/数学3.jpeg" },
]);
const webs=ref([
  {id:1,name:"洋葱学院",url:"https://www.yangcong345.com"},
  {id:2,name:"学而思网校",url:"https://www.xueersi.com"},
  {id:3,name:"猿辅导",url:"https://www.yuanfudao.com"},

]);
const route = useRoute();
// 监听 route.path，保证每次进入 "/index/tts_test" 都触发弹窗
watchEffect(() => {
  console.log("当前路由:", route.path);
  if (route.path === "/index/tts_test") {
    setTimeout(() => {
      showPopup.value = true;
    }, 15000); // 5秒后弹出
  } else {
    showPopup.value = false; // 进入其他页面时自动关闭弹窗
  }
  if (route.path === "/index/tts_teacher") {
    setTimeout(() => {
      showPopup1.value = true;
    }, 15000); // 5秒后弹出
  } else {
    showPopup1.value = false; // 进入其他页面时自动关闭弹窗
  }
});
const closePopup = () => {
  showPopup.value = false;
};

const closePopup1 = () => {
  showPopup1.value = false;
};

const size = 120; // 悬浮球大小
const imageUrl = "/static/robot.png"; // 图片路径
const embedUrl = "https://kimi.moonshot.cn/chat/cv810pvftaeb3nbvc7og"; // 内嵌网页链接
const drawerVisible = ref(false);
const top = ref(670); // 初始距离顶部的距离
const left = ref(20); // 初始距离左侧的距离
let isDragging = false; // 是否处于拖拽状态
let shaking = ref(false); // 是否处于抖动状态
let wasDragging = false; // 标记是否进行了拖动操作
const edgeThreshold = 10; // 边缘吸附的阈值
const shakeDuration = 3000; // 抖动持续时间（3秒）

// 边界检查和边缘吸附逻辑
const updatePosition = (newLeft, newTop) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // 边缘吸附逻辑
  if (newLeft < edgeThreshold) {
    newLeft = -size / 2; // 部分隐藏到左侧
  } else if (newLeft > windowWidth - edgeThreshold) {
    newLeft = windowWidth - size / 2; // 部分隐藏到右侧
  }

  if (newTop < edgeThreshold) {
    newTop = -size / 2; // 部分隐藏到顶部
  } else if (newTop > windowHeight - edgeThreshold) {
    newTop = windowHeight - size / 2; // 部分隐藏到底部
  }

  left.value = newLeft;
  top.value = newTop;
};

const startDrag = (event) => {
  event.preventDefault();
  isDragging = true;
  wasDragging = false; // 重置拖动标志

  document.addEventListener("mousemove", dragging);
  document.addEventListener("touchmove", dragging, {passive: false});
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
};

const dragging = (event) => {
  if (!isDragging) return;

  let currentX, currentY;

  if (event.type === "touchmove") {
    currentX = event.touches[0].clientX;
    currentY = event.touches[0].clientY;
  } else {
    currentX = event.clientX;
    currentY = event.clientY;
  }

  // 更新悬浮球的位置
  updatePosition(currentX - size / 2, currentY - size / 2);

  wasDragging = true; // 标记为已经拖动
  event.preventDefault();
};

const stopDrag = () => {
  isDragging = false;

  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("touchmove", dragging);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
};

const toggleDrawer = () => {
  // 只有在未拖动的情况下才触发点击事件
  if (!wasDragging) {
    drawerVisible.value = !drawerVisible.value;
  }
  wasDragging = false; // 重置拖动标志
};

const showFullBall = () => {
  // 如果悬浮球处于隐藏状态，则弹出完整形态并抖动
  if (left.value < 0 || left.value > window.innerWidth - size / 2 ||
      top.value < 0 || top.value > window.innerHeight - size / 2) {
    left.value = Math.max(0, Math.min(window.innerWidth - size, left.value));
    top.value = Math.max(0, Math.min(window.innerHeight - size, top.value));
    shaking.value = true;

    // 3秒后停止抖动
    setTimeout(() => {
      shaking.value = false;
    }, shakeDuration);
  }
};

const hideBall = () => {
  // 当鼠标离开时，恢复隐藏状态
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (left.value < edgeThreshold) {
    left.value = -size / 2;
  } else if (left.value > windowWidth - edgeThreshold) {
    left.value = windowWidth - size / 2;
  }

  if (top.value < edgeThreshold) {
    top.value = -size / 2;
  } else if (top.value > windowHeight - edgeThreshold) {
    top.value = windowHeight - size / 2;
  }
};
</script>

<style scoped>
.recommend-list{
  border-top: 1px solid #ddd;
  padding-bottom:10px;
  padding-top:10px;
  .p2{
    padding-bottom:10px;
    text-decoration: underline;
  }
  .p1{
    margin-bottom:5px;
  }
}
.floating-ball {
  position: fixed;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s ease; /* 减少过渡时间以加快响应 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.close-btn{
  background-color: transparent;
  color:#767A7D;
  border:none;
  position:absolute;
  right:20px;
  bottom:-5px;
  padding-bottom:10px;
  text-decoration: underline;
}
:deep .el-popover{
  position:relative;
  padding-bottom:10px;
}
.recommend-item{
  display: flex;
  gap:5px;
  margin-left:-10px;
  margin-top:10px;
  align-items: center;
  justify-content: center;
  padding-bottom:10px;
  .book-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size:12px;
    img{
      margin-bottom:5px;
    }
  }
}
/* 抖动动画 */
@keyframes shake {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-5px, -5px);
  }
  50% {
    transform: translate(5px, 5px);
  }
  75% {
    transform: translate(-5px, 5px);
  }
}
</style>