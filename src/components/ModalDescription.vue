<template>
  <div class="overlay">
    <div class="modal modal-video">
      <a
        :href="`https://www.youtube.com/watch?v=${videoItem.id}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class="modal_image" :src="videoItem.thumbnails" alt="Video Thumbnail" />
      </a>

      <div class="modal_description">
        <div>
          <h3 class="modal_description-title">{{ videoItem.title }}</h3>
          <p class="modal_description-text">{{ videoItem.description }}</p>
        </div>
      </div>
      <span class="modal_close-button" @click="onCloseModal">X</span>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  onCloseModal: Function
})

const videoItem = inject('video')
</script>

<style scoped>
.modal_image {
  max-width: 100%;
}
.modal-video {
  max-width: 1000px;
  padding: 3em 2.5em;
  column-gap: 1em;
}
.modal_link,
.modal_description {
  flex: 1;
  display: flex;
  align-items: center;
  text-align: left;
}
.modal_description-title {
  font-weight: 600;
  margin-bottom: 1em;
}
.modal_close-button {
  position: absolute;
  top: 10px;
  font-size: x-large;
  font-weight: 600;
  right: 1em;
  cursor: pointer;
}
@media screen and (min-width: 850px) {
  .modal {
    flex-direction: row;
  }
}
</style>
