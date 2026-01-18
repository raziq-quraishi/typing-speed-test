<script setup>
import { useResultStore } from '@/stores/resultStore.js'
const resultStore = useResultStore()
</script>
<template>
  <header class="" style="margin-bottom: 40px">
    <nav class="flex items-center justify-between">
      <img src="../assets/images/logo-large.svg" alt="" />
      <div class="flex items-center text-sm" style="color: var(--neutral-400)">
        <img class="size-5 mx-1" src="../assets/images/icon-personal-best.svg" alt="" />
        <span>Personal best:</span>
        <span class="text-[var(--neutral-0)]"> {{ resultStore.personalBest }} WPM</span>
      </div>
    </nav>
  </header>
</template>
