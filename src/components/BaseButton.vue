<script setup>
import { provide } from 'vue'
provide('message', 'Say Hello to Abdul Raziq Quraishi!')
</script>

<template>
  <div>
    <button
      class="flex items-center justify-center gap-2 p-2 text-center cursor-pointer text-sm font-semiboldn"
      @click="$emit('clickEvent')"
    >
      <slot name="btn-content" />
    </button>
  </div>
</template>
