<template>
  <ModalDescription v-if="showModal" v-on="events" />
  <ModalDelete v-if="deleteVideo" v-on="events" />
  <div class="grid-item" @click="showModal = true">
    <span class="grid-item_time">0:45</span>
    <button class="grid-item_button" @click="deleteItem($event)">X</button>
  </div>
</template>

<script setup>
import ModalDescription from './ModalDescription.vue'
import ModalDelete from './ModalDelete.vue'

import { defineComponent, ref } from 'vue'

const showModal = ref(false)
const deleteVideo = ref(false)

const events = {
  closeModal: () => (showModal.value = false),
  showDeleteModal: () => (deleteVideo.value = false)
}

const deleteItem = (event) => {
  event.stopPropagation()
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
