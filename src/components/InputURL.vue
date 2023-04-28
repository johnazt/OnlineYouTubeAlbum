<template>
  <h3 class="component-title">Añadir nuevo video</h3>
  <div class="input-container">
    <input class="input-container__input" placeholder="Añadir" type="text" v-model="videoLink" />
    <button class="input-container__button" @click="addVideo">Añadir</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY_YT
const videoLink = ref('')

const extractVideoId = (link) => {
  const regex =
    /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|y2u\.be\/)([a-zA-Z0-9_-]{11})/
  const match = link.match(regex)

  if (match && match[1]) {
    return match[1]
  } else {
    console.error('Enlace de YouTube no válido')
    return null
  }
}

const addVideo = () => {
  const videoId = extractVideoId(videoLink.value)
  if (videoId) {
    addVideoCollection(videoId)
  }
}

const addVideoCollection = (videoId) => {
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    )
    .then((response) => {
      console.log(response)
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
  padding: 0 1em;
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
