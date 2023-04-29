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
  <transition name="transition">
    <div class="message-duplicated" v-if="showDuplicateModal">
      El video ya existe en la colección 🎬😆...
    </div>
  </transition>
  <transition name="transition">
    <div v-if="invalidURL" class="message-duplicated message-invalid">
      <h3 class="message-invalid_text">Enlace inválido</h3>
      <img
        class="message-invalid_img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Achtung.svg/1024px-Achtung.svg.png"
        alt="image-invalid"
      />
    </div>
  </transition>
  <div v-if="showSuccessMessage">
    <div class="success-message">Video agregado 🎉</div>
    <div class="emoji">😄</div>
  </div>
</template>

<script setup>
import videoService from '../services/videoService'
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

const db = useFirestore()
const videosYT = useCollection(collection(db, 'videosYT'))
const videoLink = ref('')
const showDuplicateModal = ref(false)
const invalidURL = ref(false)
const showSuccessMessage = ref(false)

// OBTIENE ID DE LINK INGRESADO Y PASA COMO
const addVideo = async () => {
  const videoId = await videoService.extractVideoId(videoLink.value)
  if (videoId) {
    addVideoCollection(videoId)
  } else {
    invalidURL.value = true
    setTimeout(() => {
      invalidURL.value = false
    }, 1000)
  }
  videoLink.value = ''
}

// AGREGA NUEVO ELEMENTO A LA LISTA DE VIDEOS
const addVideoCollection = async (videoID) => {
  if (videoService.existingVideo(videosYT, videoID)) {
    showDuplicateModal.value = true
    setTimeout(() => {
      showDuplicateModal.value = false
    }, 1000)
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
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
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
  position: relative;
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
.message-duplicated {
  font-size: large;
  font-weight: 600;
  font-style: italic;
  padding-top: 2em;
  opacity: 0;
  transition: opacity 1.3s ease-in-out;
  position: absolute;
  top: 170px;
  left: 20px;
}
.transition-enter-active {
  opacity: 1;
}
.transition-leave-active {
  opacity: 0;
}
.message-invalid {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  text-align: center;
}
.message-invalid_text {
  color: var(--vt-c-black-soft);
  font-weight: 600;
  font-size: xx-large;
}
.message-invalid_img {
  height: 300px;
  margin: 0 auto;
}
.success-message {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: bold;
  z-index: 1000;
  color: green;
  opacity: 0;
  animation: fade-in 3s ease-in-out forwards;
}
.emoji {
  position: absolute;
  top: 200px;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  font-size: 78px;
  animation: bounce 3s ease-in-out infinite;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes bounce {
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
</style>
