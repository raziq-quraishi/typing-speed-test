<script setup>
const props = defineProps({
  btns: Object,
})
</script>
<template>
  <Button
    class="cursor-pointer border rounded-sm text-xs mr-2 text-amber-50 hover:text-blue-500 hover:border-blue-500 p-1"
    :class="{ 'border-blue-500 text-blue-500': props.btns.isActive }"
    @click="$emit('someEvent', props.btns.label)"
    >{{ props.btns.label }}</Button
  >
</template>
<style></style>
