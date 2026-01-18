import { defineStore } from 'pinia'

export const useResultStore = defineStore('resultStore', {
  state: () => ({
    wpm: 0,
    runs: 0,
    accuracy: 0,
    characters: {
      correct: 0,
      wrong: 0,
    },
    personalBest: 0,
    bestWpm: 0,
    lastWpm: 0,
    isNewBest: false,
  }),

  actions: {
    setResult({ wpm, accuracy, correct, wrong }) {
      this.wpm = wpm
      this.accuracy = accuracy
      this.characters.correct = correct
      this.characters.wrong = wrong
      this.lastWpm = wpm
      if (wpm > this.bestWpm) {
        this.bestWpm = wpm
        this.isNewBest = true
      } else {
        this.isNewBest = false
      }
      if (wpm > this.personalBest) {
        this.personalBest = wpm
      }
      this.runs++
    },

    reset() {
      this.wpm = 0
      this.accuracy = 0
      this.characters.correct = 0
      this.characters.wrong = 0
      this.isNewBest = false
    },
  },
  presist: true,
})
