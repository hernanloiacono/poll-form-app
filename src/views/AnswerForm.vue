<template>
    <div v-if="form" class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-6 flex flex-col items-center justify-center">
      <div class="w-full max-w-xl bg-black bg-opacity-60 p-6 rounded-2xl shadow-lg border border-purple-500">
        <h1 class="text-4xl font-extrabold text-center mb-6 tracking-widest">📝 Answer Form</h1>
  
        <h2 class="text-2xl mb-4">{{ form.title }}</h2>
  
        <form @submit.prevent="submitAnswers" class="space-y-6">
          <div v-for="(question, i) in form.questions" :key="question.id" class="space-y-2">
            <label class="block text-lg">{{ question.label }}<span v-if="question.required" class="text-red-400">*</span></label>
  
            <!-- Short Answer -->
            <input
              v-if="question.type === 'short'"
              v-model="answers[i]"
              type="text"
              class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-indigo-400 focus:ring-2 focus:ring-indigo-500"
              :required="question.required"
            />
  
            <!-- Long Answer -->
            <textarea
              v-else-if="question.type === 'long'"
              v-model="answers[i]"
              class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-indigo-400 focus:ring-2 focus:ring-indigo-500"
              :required="question.required"
            ></textarea>
  
            <!-- Number -->
            <input
              v-else-if="question.type === 'number'"
              v-model.number="answers[i]"
              type="number"
              class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-indigo-400 focus:ring-2 focus:ring-indigo-500"
              :required="question.required"
            />
  
            <!-- Single Choice -->
            <div v-else-if="question.type === 'radio'" class="space-y-2">
              <div v-for="(opt, idx) in question.options" :key="idx" class="flex items-center space-x-2">
                <input
                  type="radio"
                  :id="`q${i}-opt${idx}`"
                  :value="opt"
                  v-model="answers[i]"
                  class="accent-indigo-500"
                  :required="question.required && idx === 0"
                />
                <label :for="`q${i}-opt${idx}`">{{ opt }}</label>
              </div>
            </div>
          </div>
  
          <button
            type="submit"
            class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  
    <div v-else class="min-h-screen flex items-center justify-center text-white">
      <p class="text-2xl">Form not found 😢</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const formId = route.params.id as string
  
  // The loaded form
  const form = ref<{
    id: string
    title: string
    questions: Array<{
      id: string
      type: string
      label: string
      options: string[]
      required: boolean
    }>
    responses: any[]
  } | null>(null)
  
  // User's answers
  const answers = ref<any[]>([])
  
  onMounted(() => {
    const raw = localStorage.getItem(`form-${formId}`)
    if (raw) {
      form.value = JSON.parse(raw)
      // initialize answers array to the same length
      answers.value = form.value.questions.map(() => '')
    }
  })
  
  function submitAnswers() {
    if (!form.value) return
  
    // push a copy of answers
    form.value.responses.push([...answers.value])
    // save back to localStorage
    localStorage.setItem(`form-${formId}`, JSON.stringify(form.value))
    // go to results page for this form
    router.push(`/results/${formId}`)
  }
  </script>
  