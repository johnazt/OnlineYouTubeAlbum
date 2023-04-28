<template>
  <main>
    <div class="container">
      <InputURL />
      <VideoContainer />
    </div>
  </main>
</template>

<script setup>
import InputURL from './components/InputURL.vue'
import VideoContainer from './components/VideoContainer.vue'
</script>

<style>
main {
  height: 100vh;
}
.container {
  max-width: 1096px;
  padding: 6em 1em;
  margin: 0 auto;
}
</style>
