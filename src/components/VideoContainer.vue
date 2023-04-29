<template>
  <div class="grid-container">
    <VideoThumbnail :videos="videos" />
  </div>
</template>

<script setup>
import VideoThumbnail from '@/components/VideoThumbnail.vue'
import { defineComponent, ref } from 'vue'

defineComponent({
  components: {
    VideoThumbnail
  }
})

const props = defineProps({
  videos: {
    type: Array,
    default: () => []
  }
})

const videos = ref(props.videos)

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
