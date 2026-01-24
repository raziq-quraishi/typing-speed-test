<template>
  <div>
    <p>
      <span class="text-sm text-[var(--neutral-400)]">{{ props.label }}</span
      >:
      <span class="font-bold">{{ props.value }}</span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps(['label', 'value'])
</script>
