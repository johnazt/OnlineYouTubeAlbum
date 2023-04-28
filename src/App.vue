<template>
  <main>
    <VideoContainer />
    <InputURL />
  </main>
</template>

<script setup>
import InputURL from './components/InputURL.vue'
import VideoContainer from './components/VideoContainer.vue'
</script>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
}
.container {
  max-width: 1096px;
  padding: 6em 1em;
  margin: 0 auto;
}
</style>
