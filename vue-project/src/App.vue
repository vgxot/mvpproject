<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>

  body::-webkit-scrollbar {
    width: 12px;
  }

  textarea::-webkit-scrollbar {
    position: absolute;
    width: 12px;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  body, button, a, p, input {
    margin: 0;
  }

  * {
    border: 0;
  }

  body, h1, h2, h3 p, a, button {
    font-weight: normal;
    font-family: "Inter", sans-serif;
    text-decoration: none;
    color: black;
    font-size: 22px;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }


  input, textarea {
    padding: 0;
    font-family: "Inter", sans-serif;
  }

  input::-webkit-input-placeholder {
    color: #333;
  }

  input:focus-visible {
    outline: none;
    box-shadow: none;
  }

  a {
    all: unset;
    cursor: pointer;
  }

  button {
    flex-shrink: 0;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

</style>
