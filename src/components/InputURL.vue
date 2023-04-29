<template>
  <h3 class="component-title">Añadir nuevo video</h3>
  <div class="input-container">
    <input class="input-container__input" placeholder="Añadir" type="text" v-model="videoLink" />
    <button class="input-container__button" @click="addVideo">Añadir</button>
  </div>
  <VideoContainer :videos="videos" />
</template>

<script setup>
import VideoContainer from './VideoContainer.vue'
import videoService from '../services/videoService'
import { ref } from 'vue'

const videoLink = ref('')
const videos = ref([])

const addVideo = () => {
  const videoId = videoService.extractVideoId(videoLink.value)
  if (videoId) {
    addVideoCollection(videoId)
  }
}

const addVideoCollection = (videoId) => {
  videoService
    .getVideoDetails(videoId)
    .then((video) => {
      videos.value.push(video)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<style scoped>
.component-title {
  font-weight: 600;
  line-height: 38px;
  font-size: 1.3rem;
  margin-bottom: 0.5em;
}
.input-container {
  display: flex;
}
.input-container__input {
  flex: 4;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px 0px 0px 5px;
  padding: 0 1.5em;
}
.input-container__input::placeholder {
  color: #929293;
}
.input-container__button {
  flex: 1;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  background-color: #136ae4;
  color: #fbfbfb;
  padding: 12px 20px;
  border: transparent;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2), 0px 1px 4px rgba(0, 0, 0, 0.12),
    0px 2px 2px rgba(0, 0, 0, 0.14);
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
}
</style>
