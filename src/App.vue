<template>
  <div id="app" class="">
    <Nav />
    <ActionPanel @fromButton="handleFromButton" />
    <!-- <TypingPage /> -->
    <TextDisplay :selectedLevel="selectedLevel" />
    <NotFound />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Nav from './components/Nav.vue'
import ActionPanel from './components/ActionPanel.vue'
// import TypingPage from './compo?nents/TypingPage.vue'
import TextDisplay from './components/TextDisplay.vue'
import NotFound from './components/NotFound.vue'
const selectedLevel = ref('easy')

const handleFromButton = (e) => {
  selectedLevel.value = e
}
</script>
<style scoped></style>
