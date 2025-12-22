<script setup lang="ts">
import Nav from './components/Nav.vue'
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Nav />
    <main class="flex-grow container mx-auto px-4 py-6">
      <RouterView />
    </main>
    <footer class="bg-gray-200 text-center py-4">
      <p>&copy; 2024 My Vue App</p>
    </footer>
  </div>
</template>

<style scoped></style>
