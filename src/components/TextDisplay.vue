<template>
  <main
    class="flex items-center justify-between border-b pb-4"
    style="border-color: var(--neutral-800)"
  >
    <section class="flex items-center flex-start text-amber-50 gap-4">
      <p><span style="color: var(--neutral-400)">WPM</span>: <span>40</span></p>
      <p><span style="color: var(--neutral-400)">Accuracy</span>: <span>94%</span></p>
      <p><span style="color: var(--neutral-400)">Time</span>: <span>0:46</span></p>
    </section>
    <section class="flex items-center gap-4">
      <div>
        <span class="text-sm" style="color: var(--neutral-400)">Difficulty:</span>:
        <CustomButton v-for="btn in btns" :key="btn.label" :btns="btn" @some-event="submitEvent" />
      </div>
      <div class="text-amber-50">
        <span class="text-sm" style="color: var(--neutral-400)">Mode:</span>
        <CustomButton v-for="mode in modes" :key="mode.label" :btns="mode" />
      </div>
    </section>
  </main>
</template>
<script setup>
import data from '@/data/data.json'
import { ref, computed } from 'vue'
const props = defineProps({
  selectedLevel: String,
})

const showTextByLevel = computed(() => {
  const list = data[props.selectedLevel || 'easy']
  if (!list || list.length === 0) return null

  const randomIndex = Math.floor(Math.random() * list.length)
  return list[randomIndex]
})
</script>
<style scoped></style>
