<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-6 flex flex-col items-center justify-center">
      <div class="w-full max-w-xl bg-black bg-opacity-60 p-6 rounded-2xl shadow-lg border border-purple-500">
        <h1 class="text-4xl font-extrabold text-center mb-6 tracking-widest">🗳️ Create Poll</h1>
  
        <form @submit.prevent="handleCreatePoll" class="space-y-4">
          <QuestionInput 
            v-model="question"
            placeholder="Enter your question"
          />
  
          <div v-for="(option, index) in options" :key="index">
            <RadioOptionInput
              v-model="options[index]"
              placeholder="Option"
            />
          </div>
  
          <div class="flex justify-between mt-6">
            <button type="button" @click="addOption" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow">
              ➕ Add Option
            </button>
            <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
              ✅ Create Poll
            </button>
          </div>
        </form>
  
        <Link
          v-if="createdPollId"
          :url="`${baseUrl}/answer-poll/${createdPollId}`"
        />
  
        <RouterLink v-if="createdPollId" :to="`/results/${createdPollId}`" class="text-purple-300 hover:text-purple-500 transition duration-200">
          🧾 View Results
        </RouterLink>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useStore } from '../store/usePollFormStore'
  import QuestionInput from '../components/QuestionInput.vue'
  import RadioOptionInput from '../components/RadioOptionInput.vue'
  import Link from '../components/Link.vue'
  
  const store = useStore()
  const question = ref('')
  const options = ref<string[]>(['', '']) // Al menos 2 inputs desde el inicio
  const createdPollId = ref('')
  const baseUrl = window.location.origin
  
  const handleCreatePoll = () => {
    const validOptions = options.value.filter(opt => opt.trim() !== '')
  
    if (question.value.trim() === '' || validOptions.length < 2) {
      alert('Please enter a question and at least two options.')
      return
    }
  
    const id = String(Date.now())

    localStorage.setItem(`poll-${id}`, JSON.stringify({
        id,
        question: question.value,
        options: validOptions,
        responses: new Array(validOptions.length).fill(0),
        }))
  
    createdPollId.value = id
    question.value = ''
    options.value = ['', '']
  }
  
  const addOption = () => {
    options.value.push('')
  }
  </script>
  