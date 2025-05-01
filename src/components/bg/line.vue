<script lang="ts" setup>
defineProps({
  color: {
    type: Array<string>,
    default: []
  }
})
</script>

<template>
  <div class="comps-bg-line" :style="{ '--color1': color[0], '--color2': color[1] }">
    <div style="width: 100%; height: 100%; background-color: black; border-radius: 8px">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@property --direc {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.comps-bg-line {
  width: 100%;
  height: 100%;
  background: linear-gradient(var(--direc), var(--color1), var(--color2));
  animation: rotate 3s linear infinite;
  border-radius: 8px;
  padding: 20px;
}

@keyframes rotate {
  to {
    --direc: 360deg;
  }
}
</style>
