<template>
  <div class="overlay">
    <div class="modal">
      <p class="modal_question">¿Seguro que quieres eliminar este video?</p>
      <div class="modal_buttons">
        <button @click="onShowDeleteModal">Cancelar</button>
        <button>Eliminar</button>
      </div>
      <span class="modal_close-button" @click="onShowDeleteModal">X</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  onShowDeleteModal: Function
})
//
</script>

<style scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(2, 2, 2, 0.5);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  width: 550px;
  background-color: #fbfbfb;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.07);
  border-radius: 15px;
  padding: 2em 1em;
  position: relative;
  display: flex;
  flex-direction: column;
}
.modal_close-button {
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;
}
</style>
