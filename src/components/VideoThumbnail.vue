<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div v-for="(video, index) in videos" :key="index">
    <ModalDescription
      v-if="showModal"
      v-on="events"
      :videoId="video.id"
      :videoTitle="video.title"
      :description="video.description"
    />
    <ModalDelete v-if="deleteVideo" v-on="events" :video="video" :updateVideos="updateVideos" />
    <div
      class="grid-item"
      @click="onShowModal"
      :style="{ 'background-image': `url(${video.thumbnails})` }"
    >
      <span class="grid-item_time">{{ video?.duration }}</span>
      <button class="grid-item_button" @click="deleteItem($event, video.id)">X</button>
    </div>
  </div>
</template>

<script setup>
import ModalDescription from './ModalDescription.vue'
import ModalDelete from './ModalDelete.vue'
import { defineComponent, inject, ref } from 'vue'

const showModal = ref(false)
const deleteVideo = ref(false)

const videos = inject('videos')
const updateVideos = (updatedVideos) => {
  videos.value = updatedVideos
}

const onShowModal = () => {
  return (showModal.value = true)
}

const events = {
  closeModal: () => (showModal.value = false),
  showDeleteModal: () => (deleteVideo.value = false)
}

const deleteItem = (event, id) => {
  console.log(id)
  event.stopPropagation()
  events.showDeleteModal(id)
  deleteVideo.value = true
}

defineComponent({
  components: {
    ModalDescription
  }
})
//
</script>

<style scoped>
.grid-item {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 1px solid blue;
  height: 150px;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.07);
}
.grid-item_button,
.grid-item_time {
  position: absolute;
  background-color: #000;
  color: #fff;
  font-weight: bolder;
  border-radius: 3px;
}

.grid-item_button {
  top: 10px;
  right: 10px;
  font-size: 14px;
  border: transparent;
  padding: 2px 6px;
  cursor: pointer;
}

.grid-item_time {
  bottom: 10px;
  right: 10px;
  padding: 0 5px;
}
</style>
