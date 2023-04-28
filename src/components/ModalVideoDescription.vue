<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal_video">
        <img src="#" alt="" />
        <span>square img</span>
      </div>
      <div class="modal_description">
        <h4>Title</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis corrupti voluptatem
          eum incidunt. Sequi, facilis?
        </p>
      </div>
      <span class="modal_close-button" @click="onCloseModal">X</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  onCloseModal: Function
})
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
.modal_video,
.modal_description {
  flex: 1;
}
.modal_close-button {
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;
}
@media screen and (min-width: 750px) {
  .modal {
    flex-direction: row;
  }
}
</style>
