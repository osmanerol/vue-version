<script setup>
import { ref, onMounted } from 'vue'

const versionInterval = ref(null)

onMounted(() => {
  checkVersion()
  startVersionInterval()
})

const startVersionInterval = () => {
  versionInterval.value = setInterval(() => {
    checkVersion()
  }, 5 * 1000)
}

const checkVersion = async () => {
  const currentVersion = localStorage.getItem('version')
  const response = await fetch('/version.json', { cache: 'no-store' })
  const data = await response.json()
  if(!currentVersion) {
    localStorage.setItem('version', data?.version)
  }
  else if(currentVersion != data.version) {
    localStorage.setItem('version', data?.version)
    clearInterval(versionInterval.value)
    location.reload(true)
  }
}
</script>

<template>
  <h1>Vue Version 4</h1>
</template>

<style scoped>
</style>
