<!-- src/components/Link.vue -->
<template>
    <div class="mt-6 p-4 bg-gray-800 rounded-xl border border-purple-500 shadow text-center">
      <p class="mb-2 text-lg font-bold">📎 Share:</p>
      <input
        :value="url"
        readonly
        class="w-full px-3 py-2 rounded bg-gray-900 text-purple-300 border border-indigo-500 font-mono cursor-pointer"
        @click="copyToClipboard"
      />
      <p v-if="copied" class="mt-2 text-green-400 text-sm">✅ Copied to clipboard!</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const props = defineProps<{
    url: string
  }>()
  
  const copied = ref(false)
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.url)
      copied.value = true
      setTimeout(() => (copied.value = false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  </script>
  