```ts
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as tf from '@tensorflow/tfjs';

const canvasWrite = ref<HTMLCanvasElement | null>(null);
const canvasOriginal = ref<HTMLCanvasElement | null>(null);

const ctx = ref<CanvasRenderingContext2D | null>(null);
const isDrawing = ref(false);

const originalText = '你';

onMounted(() => {
  if (canvasWrite.value) {
    ctx.value = canvasWrite.value.getContext('2d');
    if (ctx.value) {
      ctx.value.fillStyle = 'white'; // Закрашиваем фон холста белым
      ctx.value.fillRect(0, 0, canvasWrite.value.width, canvasWrite.value.height);
    }
    createOriginalImage();
  }
});

const createOriginalImage = () => {
  if (canvasOriginal.value) {
    const ctx = canvasOriginal.value.getContext('2d')!;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 500, 500);
    ctx.font = '350px Noto Sans SC';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(originalText, 500 / 2, 500 / 2);
  }
};

const clearCanvas = () => {
  const context = canvasWrite.value!.getContext('2d');
  context!.clearRect(0, 0, 500, 500);
}

const startDrawing = (event: MouseEvent) => {
  isDrawing.value = true;
  if (ctx.value) {
    ctx.value.beginPath();
    ctx.value.moveTo(event.offsetX, event.offsetY);
    ctx.value.lineWidth = 20;
  }
};

const draw = (event: MouseEvent) => {
  if (!isDrawing.value || !ctx.value) return;
  ctx.value.lineTo(event.offsetX, event.offsetY);
  ctx.value.stroke();
};

const stopDrawing = () => {
  isDrawing.value = false;
};

const downloadImage = (canvas: HTMLCanvasElement | null, filename: string) => {
  if (!canvas) return;
  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = filename;
  link.click();
};

const compareImages = async () => {
  if (!canvasWrite.value || !canvasOriginal.value) return;

  const drawnImageTensor = tf.browser.fromPixels(canvasWrite.value).toFloat();
  const originalImageTensor = tf.browser.fromPixels(canvasOriginal.value).toFloat();

  const resizedDrawnImageTensor = tf.image.resizeBilinear(drawnImageTensor, [500, 500]);
  const resizedOriginalImageTensor = tf.image.resizeBilinear(originalImageTensor, [500, 500]);

  const difference = resizedDrawnImageTensor.sub(resizedOriginalImageTensor).abs();

  const meanDifference = await difference.mean().data();

  alert(`Средняя разница между изображениями: ${meanDifference}`);

  drawnImageTensor.dispose();
  originalImageTensor.dispose();
  resizedDrawnImageTensor.dispose();
  resizedOriginalImageTensor.dispose();
  difference.dispose();
};
</script>

<template>
  <div>
    <div style="display: flex;">
      <canvas ref="canvasWrite" width="500" height="500" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
      <canvas ref="canvasOriginal" width="500" height="500" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
    </div>
    <div>
      <button @click="downloadImage(canvasWrite, 'drawn_image.png')">Скачать нарисованное изображение</button>
      <button @click="downloadImage(canvasOriginal, 'original_image.png')">Скачать оригинальное изображение</button>
      <button @click="compareImages">Сравнить изображения</button>
    </div>
    <button @click="clearCanvas">
      Очистить канвас
    </button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400&display=swap');

canvas, img {
  border: 1px solid black;
}
</style>
```