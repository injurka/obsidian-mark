```ts
<script setup>
const items = ref([ 1, 2, 3, 4, 5 ]);
const currentIndex = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const currentTranslate = ref(0);
const itemWidth = ref(270)

const currentTranslateStyle = computed(() => 
  -currentIndex.value 
  * itemWidth.value 
  + currentTranslate.value + 'px'
);

const nextItem = () => {
  if (currentIndex.value < items.value.length - 1) {
    currentIndex.value++;
  }
};

const prevItem = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const swipeItem = (count) => {
  const newIndex = currentIndex.value + count;
  if (newIndex >= 0 && newIndex < items.value.length) {
    currentIndex.value = newIndex;
  }
};

const handleMouseDown = (event) => {
  isDragging.value = true;
  startX.value = event.clientX;
  currentTranslate.value = 0;
};

const handleMouseMove = (event) => {
  if (isDragging.value) {
    const deltaX = event.clientX - startX.value;
    currentTranslate.value = deltaX;
  }
};

const handleMouseUp = () => {
  if (isDragging.value) {
    isDragging.value = false;

    const dir = currentTranslate.value < 0 ? 1 : -1;
    const countSwipedSlides = Math.round(Math.abs(currentTranslate.value) / itemWidth.value);
    const modSlide = Math.abs(currentTranslate.value) % itemWidth.value;
    
    if (modSlide > (itemWidth.value / 2) || countSwipedSlides > 0) {
      swipeItem(dir * countSwipedSlides);
    }
    currentTranslate.value = 0;
  }
};

</script>

<template>
    <div id="app">
      <h1>Vue 3 Carousel</h1>
      <button class="carousel-control" @click="prevItem">Prev</button>
      <button class="carousel-control" @click="nextItem">Next</button>

      <div class="carousel"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp">
        <div 
          class="carousel-inner" 
          :style="{ 
            transform: 'translateX(' + currentTranslateStyle + ')',
            transition: !isDragging && 'transform 0.2s ease-in-out'
          }"
        >
          <div v-for="item in items" :key="item" class="carousel-item" />
        </div>
      </div>
    </div>
</template>

<style>
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 200px;
}
.carousel-inner {
  display: flex;
  gap: 10px;
}
.carousel-item {
  background: #ffffff;
  min-width: 260px;
  max-width: 260px;
  height: 180px;
  border-radius: 16px;
  border: 1px solid #cdd3de;
  overflow: hidden;
}
.carousel-control {
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
```