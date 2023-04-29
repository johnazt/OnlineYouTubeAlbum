<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div v-for="video in videosYT" :key="video.id">
    <ModalDescription v-if="showModal" v-on="events" />
    <ModalDelete v-if="deleteVideo" v-on="events" />
    <div
      class="grid-item"
      @click="events.openModal(video)"
      :style="{ 'background-image': `url(${video.thumbnails})` }"
    >
      <span class="grid-item_time">{{ video?.duration }}</span>
      <button class="grid-item_button" @click="events.deleteItem($event, video.id)">X</button>
    </div>
  </div>
</template>

<script setup>
import { ModalDelete, ModalDescription } from '../components'
import { defineComponent, ref, provide } from 'vue'
import { useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'

const db = useFirestore()
const videosYT = useCollection(collection(db, 'videosYT'))

const showModal = ref(false)
const deleteVideo = ref(false)
const videoID = ref('')
const videoItem = ref({})

provide('video', videoItem)
provide('id', videoID)

const events = {
  closeModal: () => (showModal.value = false),
  showDeleteModal: () => (deleteVideo.value = false),
  openModal: (video) => {
    showModal.value = true
    videoItem.value = video
  },
  deleteItem: (event, id) => {
    event.stopPropagation()
    videoID.value = id
    deleteVideo.value = true
  }
}

defineComponent({
  components: {
    ModalDescription
  }
})
</script>

<style scoped>
.grid-item {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 200px;
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
