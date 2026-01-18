<template>
  <main class="relative text-amber-50 flex flex-col justify-center items-center gap-8">
    <!-- Left Star -->
    <img
      v-if="!resultStore.isNewBest || isFirstRun"
      src="../assets/images/pattern-star-2.svg"
      class="absolute left-0 top-1/4 -translate-y-1/4 w-6 opacity-80"
    />
    <img
      v-if="!resultStore.isNewBest || isFirstRun"
      src="../assets/images/pattern-star-1.svg"
      class="absolute right-0 top-3/4 -translate-y-3/4 w-12 opacity-80"
    />

    <img
      v-if="resultStore.isNewBest && !isFirstRun"
      src="../assets/images/icon-new-pb.svg"
      class="size-12"
      alt=""
    />
    <img v-else src="../assets/images/icon-completed.svg" class="size-12" alt="" />
    <div class="flex items-center justify-center flex-col">
      <h1 class="text-3xl font-bold">
        {{
          isFirstRun
            ? 'Baseline Established!'
            : resultStore.isNewBest && !isFirstRun
              ? 'High Score Smashed!'
              : 'Test Complete!'
        }}
      </h1>

      <p class="text-[var(--neutral-400)] text-sm mt-1">
        {{
          isFirstRun
            ? "You've set the bar. Now the real challenge begins--time to beat it."
            : resultStore.isNewBest && !isFirstRun
              ? "You're getting faster. That was incredible Typing"
              : 'Solid run. Keep pushing to beat your high score'
        }}
      </p>
    </div>
    <div class="cards-container flex items-center justify-between gap-4">
      <!-- Card 1 -->
      <div class="card border border-[var(--neutral-800)] rounded-md p-2 w-[100px] text-center">
        <p class="text-xs text-[var(--neutral-400)]">WPM</p>
        <p class="font-bold">{{ resultStore.wpm }}</p>
      </div>
      <!-- Card 2 -->
      <div class="card border border-[var(--neutral-800)] rounded-md p-2 w-[100px] text-center">
        <p class="text-xs text-[var(--neutral-400)]">Accuracy</p>
        <p
          class="font-bold"
          :class="{
            'text-[var(--red-500)]': resultStore.accuracy < 100,
            'text-[var(--green-500)]': resultStore.accuracy == 100,
          }"
        >
          {{ resultStore.accuracy ?? 100 }}%
        </p>
      </div>
      <!-- Card 3 -->
      <div class="card border border-[var(--neutral-800)] rounded-md p-2 w-[100px] text-center">
        <p class="text-xs text-[var(--neutral-400)]">Characters</p>
        <p class="font-bold">
          <span class="text-[var(--green-500)]">{{ resultStore.characters.correct ?? 100 }}</span> /
          <span class="text-[var(--red-500)]">{{ resultStore.characters.wrong ?? 0 }}</span>
        </p>
      </div>
    </div>
    <button
      class="bg-white flex item-center justify-center gap-1 p-2 rounded text-center cursor-pointer"
      @click="goAgain"
    >
      <span class="font-bold text-sm -mt-1 text-[var(--neutral-900)]" v-if="isFirstRun"
        >Beat This Score
      </span>
      <span class="font-bold text-sm -mt-1 text-[var(--neutral-900)]" v-else>Go Again </span>
      <span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 20 20"
          class=""
        >
          <path
            fill="#000"
            d="M1.563 1.281h.949c.246 0 .422.211.422.457l-.07 3.446a8.6 8.6 0 0 1 7.277-3.868c4.816 0 8.718 3.938 8.718 8.72-.035 4.816-3.937 8.683-8.718 8.683a8.86 8.86 0 0 1-5.871-2.215.446.446 0 0 1 0-.633l.703-.703c.14-.14.386-.14.562 0 1.23 1.09 2.813 1.723 4.606 1.723A6.88 6.88 0 0 0 17.03 10c0-3.797-3.093-6.89-6.89-6.89-2.813 0-5.203 1.687-6.293 4.078l4.43-.106c.245 0 .456.176.456.422v.95c0 .245-.21.421-.421.421h-6.75a.406.406 0 0 1-.422-.422v-6.75c0-.21.175-.422.422-.422"
          /></svg
      ></span>
    </button>
    <img
      v-if="resultStore.isNewBest && !isFirstRun"
      src="../assets/images/pattern-confetti.svg"
      class="absolute left-0 bottom-0 right-0 translate-y-74 h-58 w-full"
    />
  </main>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useResultStore } from '@/stores/resultStore.js'

import { computed, onMounted, ref } from 'vue'
const router = useRouter()
const resultStore = useResultStore()
const isFirstRun = computed(() => resultStore.runs == 1)

if (resultStore.wpm == 0) {
  router.push('/')
}
const goAgain = () => {
  resultStore.reset()
  router.push('/')
}
</script>
<style></style>
