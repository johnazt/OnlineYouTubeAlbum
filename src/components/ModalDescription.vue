<template>
  <div class="overlay">
    <div class="modal modal-video">
      <iframe
        maxWidth="400"
        height="300"
        class="modal_link"
        :src="`https://www.youtube.com/embed/${props.videoId}`"
        frameborder="0"
        allowfullscreen
      ></iframe>

      <div class="modal_description">
        <div>
          <h3 class="modal_description-title">{{ props.videoTitle }}</h3>
          <p class="modal_description-text">{{ props.description }}</p>
        </div>
      </div>
      <span class="modal_close-button" @click="onCloseModal">X</span>
    </div>
  </div>
</template>

<script setup>
//

const props = defineProps({
  onCloseModal: Function,
  videoTitle: {
    type: String
  },
  description: {
    type: String
  },
  videoId: {
    type: String
  }
})
</script>

<style scoped>
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
@media screen and (min-width: 750px) {
  .modal {
    flex-direction: row;
  }
}
</style>
