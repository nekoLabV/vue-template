<script setup lang="ts">
import { ref, onMounted } from 'vue'
import servers from '@/servers'
import storage from './local'

const isLoading = ref<boolean>(false)

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
  servers.getData('./mockdata.json')
  storage.set('name', { value: 'xxx', expire: 10 })
  const name = storage.get('name')
  console.log(name)
})
</script>

<template>
  <div class="template" v-loading="isLoading">template</div>
</template>
