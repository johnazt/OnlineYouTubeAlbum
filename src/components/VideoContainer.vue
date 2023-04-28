<template>
  <div class="grid-container">
    <div v-for="video in videos" :key="video.id">
      <VideoThumbnail />
    </div>
  </div>
  <button @click="addVideo">hola</button>
</template>

<script setup>
import VideoThumbnail from '@/components/VideoThumbnail.vue'
import { defineComponent, ref } from 'vue'
import axios from 'axios'

defineComponent({
  components: {
    VideoThumbnail
  }
})

const API_KEY = import.meta.env.VITE_API_KEY

const videos = ref([])

const addVideo = () => {
  // Hacer la llamada a la API de YouTube para obtener información del video
  axios
    .get(`https://www.googleapis.com/youtube/v3/videos?id=I_xLMmNeLDY&key=${API_KEY}`)
    .then((response) => {
      console.log(response)
      // const videoData = response.data.items[0].snippet
      // const video = {
      //   id: videoData.resourceId.videoId,
      //   link,
      //   title: videoData.title,
      //   description: videoData.description
      // }
      // videos.value.push(video)
    })
    .catch((error) => {
      console.error(error)
    })
}

//
</script>

<style>
.grid-container {
  max-width: 990px;
  padding: 1em;
  margin: 5em auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2em;
  text-align: center;
}

@media screen and (min-width: 550px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (min-width: 920px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
