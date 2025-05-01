<script lang="ts" setup>
import BgLine from '@/components/bg/line.vue'
import { ref, onMounted } from 'vue'
import servers from '@/servers'
import storage from './local'
import eventBus from '@/utils/eventBus'
import { randomColor } from '@/utils/tools'

const color1 = ref<string>(randomColor())
const color2 = ref<string>(randomColor())

onMounted(() => {
  setInterval(() => {
    color1.value = randomColor()
    color2.value = randomColor()
  }, 2500)
})
</script>

<template>
  <div>
    <BgLine :color="[color1, color2]" style="width: 400px; height: 600px; margin: auto">
      <div
        style="display: flex; flex-direction: column; justify-content: center; align-items: center"
      >
        <div>123</div>
        <div>123</div>
        <div>123</div>
      </div>
    </BgLine>
  </div>
</template>
