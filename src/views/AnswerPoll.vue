<template>
    <div v-if="poll" class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-6 flex flex-col items-center justify-center">
      <div class="w-full max-w-xl bg-black bg-opacity-60 p-6 rounded-2xl shadow-lg border border-purple-500">
        <h1 class="text-3xl font-bold mb-4 text-center">{{ poll.question }}</h1>
  
        <form @submit.prevent="submitResponse" class="space-y-4">
          <div v-for="(option, index) in poll.options" :key="index" class="flex items-center space-x-2">
            <input type="radio" :id="`option-${index}`" :value="index" v-model="selectedOption" class="accent-purple-600" />
            <label :for="`option-${index}`" class="text-lg">{{ option }}</label>
          </div>
  
          <button type="submit" class="w-full mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
            🗳️ Submit Vote
          </button>
        </form>
      </div>
    </div>
  
    <div v-else class="text-white text-center p-10">
      <h2 class="text-2xl">Poll not found 😢</h2>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const pollId = ref(route.params.id as string)
  const selectedOption = ref<number | null>(null)
  const poll = ref<any>(null)
  
  onMounted(() => {
    const data = localStorage.getItem(`poll-${pollId.value}`)
    if (data) {
      poll.value = JSON.parse(data)
    }
  })
  
  const submitResponse = () => {
    if (selectedOption.value === null || !poll.value) return
  
    poll.value.responses[selectedOption.value] += 1
    localStorage.setItem(`poll-${pollId.value}`, JSON.stringify(poll.value))
    alert('Thanks for voting! 🥳')
    selectedOption.value = null
  }
  </script>
  