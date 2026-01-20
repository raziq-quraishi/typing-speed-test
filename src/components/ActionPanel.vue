<template>
  <textarea
    @input="initTyping"
    id="inputField"
    v-model="inputValue"
    class="bg-white text-black absolute opacity-0 pointer-events-none"
    ref="hiddenInput"
  ></textarea>
  <main class="flex items-center justify-between border-b pb-4 border-[var(--neutral-800)]">
    <section class="flex items-center text-[var(--neutral-0)] divide-x divide-[var(--neutral-800)]">
      <p class="w-24 pr-4">
        <span class="text-sm text-[var(--neutral-400)]">WPM</span>:
        <span class="font-bold">{{ wpm }}</span>
      </p>

      <p class="px-4">
        <span class="text-sm text-[var(--neutral-400)]">Accuracy</span>:
        <span class="font-bold">{{ accuracy }}%</span>
      </p>

      <p class="px-4" v-if="mode === 'times'">
        <span class="text-sm text-[var(--neutral-400)]">Time</span>:
        <span class="font-bold" :class="{ 'text-[var(--yellow-400)]': isTyping }">
          0:{{ timeLeft }}
        </span>
      </p>
      <p v-else class="text-sm text-[var(--neutral-400)]">Passage Mode</p>
    </section>

    <section class="flex items-center gap-4 divide-x divide-[var(--neutral-800)]">
      <div>
        <span class="text-sm text-[var(--neutral-400)]">Difficulty:</span>:
        <button
          v-for="btn in btns"
          :key="btn.label"
          class="cursor-pointer border rounded-sm text-xs mr-2 text-[var(--neutral-0)] hover:text-[var(--blue-400)] hover:border-[var(--blue-400)] p-1"
          :class="{
            'border-[var(--blue-600)] text-blue-500': activeBtn === btn.label,
            'text-[var(--neutral-0)] border-[var(--neutral-400)]': activeBtn !== btn.label,
          }"
          @click="setDifficulty(btn.label)"
        >
          {{ btn.label }}
        </button>
      </div>
      <div class="text-[var(--neutral-0)]">
        <span class="text-sm mr-1 text-[var(--neutral-400)]">Mode:</span>
        <button
          v-for="m in ['times', 'passage']"
          :key="m"
          class="cursor-pointer border rounded-sm text-xs mr-2 text-[var(--neutral-0)] hover:text-[var(--blue-400)] hover:border-[var(--blue-400)] p-1"
          :class="{ 'border-[var(--blue-600)] text-blue-500': mode === m }"
          @click="setMode(m)"
        >
          {{ m }}
        </button>
      </div>
    </section>
  </main>
  <section class="text-[var(--neutral-0)] text-3xl py-6 border-b border-[var(--neutral-800)]">
    <div
      class="fixed inset-0 flex flex-col gap-2 items-center justify-center z-50"
      @click="removeBlur"
      v-if="isBlurred"
    >
      <button
        class="bg-[var(--blue-600)] rounded-sm text-[var(--neutral-0)] p-2 text-sm cursor-pointer hover:bg-[var(--blue-400)] z-100"
        @click="removeBlur"
      >
        Start Typing Test
      </button>
      <p class="text-sm text-[var(--neutral-0)]">Or click the text start typing</p>
    </div>
    <span
      v-for="(item, index) in charArr"
      :key="index"
      class="text-span transition-all duration-300 tracking-wider text-3xl/12"
      :class="{
        'text-[var(--green-500)]': item.status === 'correct',
        'text-[var(--red-500)] underline': item.status === 'incorrect',
        'text-[var(--neutral-0)]': item.status === 'pending',
        'active bg-[var(--neutral-400)]/30': index === inputValue.length,
        'blur-xs': isBlurred,
      }"
      >{{ item.char }}</span
    >
  </section>
  <section class="flex items-center justify-center mt-4">
    <button
      class="bg-[var(--neutral-800)] flex items-center justify-center rounded-sm text-[var(--neutral-0)] p-2 gap-2 text-sm font-semibold"
      v-if="!isBlurred"
      @click="restartTyping"
    >
      <span>Restart Test</span>
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
            fill="#fff"
            d="M1.563 1.281h.949c.246 0 .422.211.422.457l-.07 3.446a8.6 8.6 0 0 1 7.277-3.868c4.816 0 8.718 3.938 8.718 8.72-.035 4.816-3.937 8.683-8.718 8.683a8.86 8.86 0 0 1-5.871-2.215.446.446 0 0 1 0-.633l.703-.703c.14-.14.386-.14.562 0 1.23 1.09 2.813 1.723 4.606 1.723A6.88 6.88 0 0 0 17.03 10c0-3.797-3.093-6.89-6.89-6.89-2.813 0-5.203 1.687-6.293 4.078l4.43-.106c.245 0 .456.176.456.422v.95c0 .245-.21.421-.421.421h-6.75a.406.406 0 0 1-.422-.422v-6.75c0-.21.175-.422.422-.422"
          /></svg
      ></span>
    </button>
  </section>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useResultStore } from '@/stores/resultStore.js'
import data from '@/data/data.json'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
const router = useRouter()
const resultStore = useResultStore()
const btns = ref([{ label: 'easy' }, { label: 'medium' }, { label: 'hard' }])
const mode = ref('times')
let showData = ref('')
let charArr = ref([])
let inputValue = ref('')
const activeBtn = ref('easy')
let isTyping = ref(false)
let hiddenInput = ref(null)
let isBlurred = ref(true)
let elapsedSeconds = ref(0)
let timer = null
let maxTime = ref(60)
let timeLeft = ref(maxTime.value)
onBeforeUnmount(() => {
  document.removeEventListener('click', focusInput)
  document.removeEventListener('click', removeBlur)
})
onMounted(() => {
  hiddenInput.value.focus()
  document.addEventListener('click', focusInput)
  document.addEventListener('click', removeBlur)
  renderData()
})

const correctChars = computed(() => {
  return charArr.value.filter((char) => char.status === 'correct').length
})
const incorrectChars = computed(() => {
  return charArr.value.filter((char) => char.status === 'incorrect').length
})

const accuracy = computed(() => {
  const total = correctChars.value + incorrectChars.value
  return Math.min(100, Math.round((correctChars.value / (total || 1)) * 100))
})

const wpm = computed(() => {
  const minutes = elapsedSeconds.value / 60
  if (minutes <= 0) return 0
  return Math.round(correctChars.value / 5 / minutes)
})

const setMode = (m) => {
  mode.value = m
  restartTyping()
}
const focusInput = () => {
  hiddenInput.value.focus()
}
const setDifficulty = (level) => {
  activeBtn.value = level
  renderData(level)
}
const restartTyping = () => {
  inputValue.value = ''
  clearInterval(timer)
  timeLeft.value = maxTime.value
  elapsedSeconds.value = 0
  isTyping.value = false
  isBlurred.value = true
  renderData()
  hiddenInput.value.focus()
}
const initTyping = () => {
  if (isBlurred.value) {
    isBlurred.value = false
  }
  let typedChars = inputValue.value.split('')
  if (typedChars.length === charArr.value.length) {
    checkFinish()
    return
  }
  if (timeLeft.value > 0) {
    charArr.value.forEach((item, index) => {
      if (typedChars[index] == null) {
        item.status = 'pending'
      } else if (typedChars[index] === item.char) {
        item.status = 'correct'
      } else {
        item.status = 'incorrect'
      }
    })
    if (!isTyping.value) {
      timer = setInterval(initTimer, 1000)
      isTyping.value = true
    }
  }
}

let removeBlur = () => {
  isBlurred.value = false
  hiddenInput.value?.focus()
}

const renderData = (level = activeBtn.value) => {
  inputValue.value = ''
  charArr.value = []
  const dataList = data[level]
  const randomIndex = Math.floor(Math.random() * dataList.length)
  showData = dataList[randomIndex].text
  charArr.value = showData.split('').map((char) => ({
    status: 'pending',
    char,
  }))
  charArr.value[0].first = 'active'
}

const checkFinish = () => {
  if (mode.value === 'times' && timeLeft.value === 0) {
    finishTyping()
  }

  if (mode.value === 'passage' && inputValue.value.length === charArr.value.length) {
    finishTyping()
  }
}
const finishTyping = () => {
  let typing_info = {
    wpm: wpm.value,
    accuracy: accuracy.value,
    correct: correctChars.value,
    wrong: incorrectChars.value,
  }

  resultStore.setResult(typing_info)

  localStorage.setItem('typing_info', JSON.stringify(typing_info))
  clearInterval(timer)
  isTyping.value = false
  router.push('/summary')
}

const initTimer = () => {
  elapsedSeconds.value++
  if (mode.value === 'times') {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      checkFinish()
    }
  }
}
</script>
<style scoped></style>
