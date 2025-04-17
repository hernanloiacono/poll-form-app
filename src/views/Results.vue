<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-6 flex flex-col items-center justify-center">
      <div class="w-full max-w-xl bg-black bg-opacity-60 p-6 rounded-2xl shadow-lg border border-purple-500">
        <h1 class="text-3xl font-bold mb-4 text-center">Results</h1>
  
        <!-- Poll Display -->
        <div v-if="poll">
          <h2 class="text-2xl mb-6 text-center">{{ poll.question }}</h2>
  
          <div v-for="(option, index) in poll.options" :key="index" class="mb-4">
            <p class="text-lg">{{ option }}: <strong>{{ poll.responses[index] }} votes</strong></p>
          </div>
        </div>
  
        <!-- Form Display -->
        <div v-else-if="form">
          <h2 class="text-2xl mb-6 text-center">{{ form.title }}</h2>
  
          <!-- Table to display form results -->
          <table class="min-w-full bg-black text-white rounded-lg border-collapse">
            <thead>
              <tr>
                <!-- Show questions as headers -->
                <th class="py-2 px-4 border-b text-left">Questions</th>
                <th v-for="(question, index) in form.questions" :key="index" class="py-2 px-4 border-b text-left">
                  {{ question.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Show the responses for each user (should be one row for each response set) -->
              <tr v-for="(responseSet, responseIndex) in form.responses" :key="responseIndex">
                <td class="py-2 px-4 border-b">Response {{ responseIndex + 1 }}</td>
                <!-- Show each answer for a question -->
                <td v-for="(question, questionIndex) in form.questions" :key="questionIndex" class="py-2 px-4 border-b">
                  <!-- Access the response for the current question from responseSet -->
                  <span v-if="!isNaN(Number(responseSet[questionIndex]))">
                    {{ Number(responseSet[questionIndex]) }} <!-- Display numbers properly -->
                  </span>
                  <span v-else>
                    {{ responseSet[questionIndex] }} <!-- Display text responses -->
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Not Found Message -->
        <div v-else>
          <p class="text-center text-lg">Not found 😢</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const id = ref(route.params.id as string)
  const poll = ref<any>(null)
  const form = ref<any>(null)
  
  onMounted(() => {
    // Try to load poll from localStorage
    const pollData = localStorage.getItem(`poll-${id.value}`)
    if (pollData) {
      poll.value = JSON.parse(pollData)
    }
  
    // Try to load form from localStorage
    const formData = localStorage.getItem(`form-${id.value}`)
    if (formData) {
      form.value = JSON.parse(formData)
    }
  })
  </script>
  