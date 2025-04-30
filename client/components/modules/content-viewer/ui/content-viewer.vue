<script setup lang="ts">
import { MarkdownContent } from '~/components/shared/markdown-content'

interface Props {
  content: string
  imageBasePath: string
}
defineProps<Props>()
</script>

<template>
  <div class="content-viewer">
    <MarkdownContent
      class="markdown-body-wrapper"
      :content="content"
      :image-base-path="imageBasePath"
    />
  </div>
</template>

<style lang="scss">
.content-viewer {
  margin: 0 auto;
  width: 1200px;
  max-width: 100%;
  min-height: 90vh;
}

.markdown-body-wrapper {
  padding: 20px;
  background-color: var(--bg-primary-color);

  @include mobile {
    padding: 8px;
  }
}
</style>
