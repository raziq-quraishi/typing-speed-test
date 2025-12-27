<template>
  <main class="text-amber-50">
    <!-- <h1>Typing Page.</h1> -->
    <!-- <p v-for="text in showTextByLevel" :key="text.id">{{ text.text }}</p> -->
    <p>{{ showTextByLevel.text }}</p>
  </main>
</template>
<script setup>
import data from '@/data/data.json'
import { ref, computed } from 'vue'
const props = defineProps({
  selectedLevel: String,
  // default: 'easy',
})
// const selectedLevel = ref('easy')

const showTextByLevel = computed(() => {
  const list = data[props.selectedLevel]
  if (!list || list.length === 0) return null

  const randomIndex = Math.floor(Math.random() * list.length)
  return list[randomIndex]
})
console.log('show text by level----->', showTextByLevel.text)
</script>
<style scoped></style>
