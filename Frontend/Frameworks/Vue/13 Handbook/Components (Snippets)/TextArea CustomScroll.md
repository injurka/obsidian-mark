```ts
<script setup lang="ts">
const text = ref<string>('')
const textarea = ref<HTMLTextAreaElement>()
const scrollThumb = ref<HTMLDivElement>()
const isDragging = ref<boolean>(false)

function handleScroll() {
  if (!textarea.value || !scrollThumb.value)
    return

  const { scrollTop, scrollHeight, clientHeight } = textarea.value
  const thumbHeight = (clientHeight / scrollHeight) * clientHeight
  const thumbPosition = (scrollTop / scrollHeight) * clientHeight

  scrollThumb.value.style.height = `${thumbHeight}px`
  scrollThumb.value.style.transform = `translateY(${thumbPosition}px)`
}

function startDrag(_: MouseEvent) {
  isDragging.value = true
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function onDrag(e: MouseEvent) {
  if (!isDragging.value || !textarea.value || !scrollThumb.value)
    return

  const { top, height } = textarea.value.getBoundingClientRect()
  const y = e.clientY - top
  const scrollPosition = (y / height) * textarea.value.scrollHeight

  textarea.value.scrollTop = scrollPosition
}
</script>

<template>
  <div class="textarea-wrapper">
    <textarea
      ref="textarea"
      v-model="text"
      class="custom-textarea"
      @scroll="handleScroll"
    />
    <div class="scroll-track">
      <div
        ref="scrollThumb"
        class="scroll-thumb"
        @mousedown="startDrag"
      />
    </div>
  </div>
</template>

<style scoped>
.textarea-wrapper {
  position: relative;
  width: 300px;
  height: 200px;
}

.custom-textarea {
  width: 100%;
  height: 100%;
  padding: 8px;
  resize: none;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.scroll {
  &-track {
    position: absolute;
    top: 2px;
    right: 2px;
    bottom: 2px;
    width: 8px;
    background: #e2e8f0;
    border-radius: 4px;
  }
  &-thumb {
    position: absolute;
    width: 100%;
    background: #4a5568;
    border-radius: 4px;
    cursor: grab;
    transition: background 0.2s;

    &:active {
      cursor: grabbing;
      background: #2d3748;
    }
  }
}
</style>

```