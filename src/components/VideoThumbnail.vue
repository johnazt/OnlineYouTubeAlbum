<template>
  <ModalVideoDescription v-if="showModal" v-on="events" />
  <div class="grid-item">
    <h4 @click="showModal = true">Item</h4>
  </div>
</template>

<script setup>
import ModalVideoDescription from './ModalVideoDescription.vue'
import { defineComponent, ref } from 'vue'

const showModal = ref(false)

const events = {
  closeModal: () => (showModal.value = false)
}

defineComponent({
  components: {
    ModalVideoDescription
  }
})
//
</script>

<style scoped>
.grid-item {
  border: 1px solid blue;
  cursor: pointer;
}
</style>
