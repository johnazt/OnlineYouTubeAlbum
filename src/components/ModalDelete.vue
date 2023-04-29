<template>
  <div class="overlay">
    <div class="modal modal_delete">
      <p class="modal_question">¿Seguro que quieres eliminar este video?</p>
      <div class="modal_buttons">
        <div class="spacer"></div>
        <button class="modal_btn btn_cancel" @click="onShowDeleteModal">Cancelar</button>
        <button class="modal_btn btn_delete" @click="deleteVideo(videoID)">Eliminar</button>
      </div>
      <span class="modal_close-button" @click="onShowDeleteModal">X</span>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  onShowDeleteModal: {
    type: Function,
    required: true
  },
  updateVideos: {
    type: Function,
    required: true
  }
})

const videos = inject('videos')
const videoID = inject('id')

const deleteVideo = (id) => {
  const index = videos.value.findIndex((vid) => vid.id === id)
  if (index !== -1) {
    const updatedVideos = [...videos.value.slice(0, index), ...videos.value.slice(index + 1)]
    props.updateVideos(updatedVideos)
  }
  props.onShowDeleteModal()
}
//
</script>

<style scoped>
.modal_question {
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  margin: 1.5em;
}
.modal_buttons {
  display: flex;
  column-gap: 1em;
}
.modal_btn {
  flex: 1;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  padding: 12px 20px;
  border: transparent;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2), 0px 1px 4px rgba(0, 0, 0, 0.12),
    0px 2px 2px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  cursor: pointer;
}
.btn_cancel {
  background-color: #fbfbfb;
  color: #136ae4;
  border: 1px solid #136ae4;
}
.btn_delete {
  background-color: #136ae4;
  color: #fbfbfb;
}
.modal_close-button {
  position: absolute;
  top: 1em;
  right: 1em;
  font-size: large;
  font-weight: 600;
  cursor: pointer;
}
@media screen and (min-width: 750px) {
  .modal_delete {
    min-width: 750px;
    padding: 1.5em 2.5em;
  }
  .spacer,
  .btn_cancel,
  .btn_delete {
    flex: 1;
  }
}
</style>
