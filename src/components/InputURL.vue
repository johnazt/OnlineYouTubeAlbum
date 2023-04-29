<template>
  <h3 class="component-title">Añadir nuevo video</h3>
  <div class="input-container">
    <input
      class="input-container__input"
      placeholder="Añadir URL"
      type="text"
      v-model="videoLink"
    />
    <button class="input-container__button" @click="addVideo">Añadir</button>
  </div>
  <VideoContainer />
</template>

<script setup>
import VideoContainer from './VideoContainer.vue'
import videoService from '../services/videoService'
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

const db = useFirestore()
const videosYT = useCollection(collection(db, 'videosYT'))
const videoLink = ref('')

const addVideo = async () => {
  const videoId = await videoService.extractVideoId(videoLink.value)
  if (videoId) {
    addVideoCollection(videoId)
  }
  videoLink.value = ''
}

const addVideoCollection = async (videoID) => {
  if (videoService.existingVideo(videosYT, videoID)) {
    console.log('El video ya existe en la lista.')
    return
  }
  try {
    const video = await videoService.getVideoDetails(videoID)
    const docRef = await addDoc(collection(db, 'videosYT'), {
      id: video.id,
      videoID: video.id,
      description: video.description,
      duration: video.duration,
      thumbnails: video.thumbnails,
      title: video.title
    })
    return docRef
  } catch (error) {
    console.error(error)
  }
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
