<script setup>
import { ref } from 'vue'

const btns = ref([
  {
    label: 'Easy',
    isActive: false,
  },
  {
    label: 'Medium',
    isActive: false,
  },
  {
    label: 'Hard',
    isActive: true,
  },
])
const modes = ref([
  {
    label: 'Timed (60s)',
    isActive: true,
  },
  {
    label: 'Passage',
    isActive: false,
  },
])
</script>
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
        <button
          v-for="btn in btns"
          :key="btn.label"
          class="cursor-pointer border rounded-sm text-xs mr-2 text-amber-50 hover:text-blue-500 hover:border-blue-500 p-1"
          :class="{ 'border-blue-500 text-blue-500': btn.isActive }"
        >
          {{ btn.label }}
        </button>
      </div>
      <div class="text-amber-50">
        <span class="text-sm" style="color: var(--neutral-400)">Mode:</span>
        <button
          v-for="mode in modes"
          :key="mode.label"
          class="cursor-pointer border rounded-sm text-xs mr-1 text-amber-50 hover:text-blue-500 hover:border-blue-500 p-1"
          :class="{ 'border-blue-500 text-blue-500': mode.isActive }"
        >
          {{ mode.label }}
        </button>
      </div>
    </section>
  </main>
</template>
