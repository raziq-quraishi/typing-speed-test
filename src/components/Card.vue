<template>
  <div class="card border border-[var(--neutral-800)] rounded-md p-2 w-[100px] text-center">
    <p class="text-xs text-[var(--neutral-400)]">{{ props.label }}</p>
    <p class="font-bold">{{ props.value }} <slot name="content"></slot></p>
  </div>
</template>
<script setup>
const props = defineProps(['label', 'value'])
</script>
