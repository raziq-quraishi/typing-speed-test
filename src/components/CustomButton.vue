<!-- <template>
  <button
    class="cursor-pointer border rounded-sm text-xs mr-2 text-amber-50 hover:text-blue-500 hover:border-blue-500 p-1"
    :class="{ 'border-blue-500 text-blue-500': props.btns.isActive }"
    @click="handleEvent"
  >
    {{ props.btns.label }}
  </button>
</template>
<script setup>
const props = defineProps({
  btns: Object,
})
const emit = defineEmits(['someEvent'])
const handleEvent = () => {
  props.btns.isActive = !props.btns.isActive
  emit('someEvent', props.btns.label)
}
</script>
<style></style> -->
