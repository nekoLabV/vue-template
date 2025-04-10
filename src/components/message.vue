<script lang="ts" setup>
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'success'
  },
  message: {
    type: String,
    default: '提示信息'
  },
  duration: {
    type: Number,
    default: 2000
  }
})

const isShow = ref(false)
const timer = ref<number>()

function open() {
  isShow.value = true
  timer.value = setTimeout(() => close(), props.duration)
}

function close() {
  isShow.value = false
}

onUnmounted(() => {
  timer.value && clearTimeout(timer.value)
})

defineExpose({
  open
})
</script>

<template>
  <Teleport v-if="isShow" to="body">
    <div class="map-coord-message">
      {{ message }}
    </div>
  </Teleport>
</template>
