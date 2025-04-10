<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    default: '20px'
  },
  svgSize: {
    type: String,
    default: '16px'
  }
})
</script>

<template>
  <div class="loading-spinner" :style="{ '--size': size, '--svg-size': svgSize }">
    <svg class="loading-spinner__circle-svg" viewBox="25 25 50 50">
      <circle
        class="loading-spinner__circle-stroke"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke-width="2"
        stroke-miterlimit="10"
      />
    </svg>
  </div>
</template>
