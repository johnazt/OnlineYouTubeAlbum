<template>
  <main>
    <div class="container">
      <URLInputField />
      <VideoContainer />
    </div>
  </main>
</template>

<script setup>
import { VideoContainer, URLInputField } from './components'
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
