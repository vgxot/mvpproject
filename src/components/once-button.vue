<script lang="ts" setup>
import {ref} from "vue";

const animate = ref<boolean>(false)

function click() {
  animate.value = true
  setTimeout(() => {
    animate.value = false
  }, 350)
}

</script>

<template>
  <button name="button" :class="{'animate': animate}" class="button-text flex-center fs-22 inter-s-b" @click="click">
    <slot/>
  </button>
</template>

<style scoped>
.button-text {
  transition: all .25s ease-in-out;
}

.button-text.animate {
  transition: all .25s ease-in-out;
  transform: scale(.95);
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-text {
  cursor: pointer;
  border: none;
  font-size: 18px;
  background-color: #d8d8d8;
  border-radius: 25px;
  padding: 12px 20px;
  height: max-content;
  transition: width 500ms ease-in-out;
  user-select: none;
}
</style>