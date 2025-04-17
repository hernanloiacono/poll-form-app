<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-6 flex flex-col items-center justify-center">
      <div class="w-full max-w-xl bg-black bg-opacity-60 p-6 rounded-2xl shadow-lg border border-purple-500">
        <h1 class="text-4xl font-extrabold text-center mb-6 tracking-widest">📝 Create Form</h1>
  
        <form @submit.prevent="handleCreateForm" class="space-y-6">
          <!-- Form Title -->
          <QuestionInput
            v-model="title"
            placeholder="Enter form title"
          />
  
          <!-- Dynamic Questions -->
          <div v-for="(q, qi) in formQuestions" :key="q.id" class="p-4 bg-gray-800 rounded-lg space-y-4">
            <!-- Question Label -->
            <QuestionInput
              v-model="q.label"
              placeholder="Question text"
            />
  
            <!-- Type Selector -->
            <select
              v-model="q.type"
              class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-purple-400"
            >
              <option value="short">Short Answer</option>
              <option value="long">Long Answer</option>
              <option value="number">Number</option>
              <option value="radio">Single Choice</option>
            </select>
  
            <!-- Radio Options (dynamic) -->
            <div v-if="q.type === 'radio'" class="space-y-2">
              <div v-for="(opt, oi) in q.options" :key="oi">
                <RadioOptionInput
                  v-model="q.options[oi]"
                  placeholder="Option text"
                />
              </div>
              <button
                type="button"
                @click="addOption(qi)"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
              >
                ➕ Add Option
              </button>
            </div>
  
            <!-- Required Checkbox -->
            <label class="inline-flex items-center space-x-2 mt-2">
              <input type="checkbox" v-model="q.required" class="form-checkbox h-5 w-5 text-green-400" />
              <span>Required?</span>
            </label>
          </div>
  
          <!-- Add New Question -->
          <button
            type="button"
            @click="addQuestion"
            class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow mr-5"
          >
            ➕ Add Question
          </button>
  
          <!-- Undo Last Question -->
          <button
            type="button"
            @click="removeLastQuestion"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow mt-4"
          >
            ⏪ Remove Question
          </button>
  
          <!-- Submit -->
          <button
            type="submit"
            class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            ✅ Create Form
          </button>
        </form>
  
        <!-- Links after creation -->
        <div v-if="createdFormId" class="mt-6 space-y-3 text-center">
          <!-- 1) Link to answer the form -->
          <Link :url="`${baseUrl}/answer-form/${createdFormId}`" />
  
          <!-- 2) Link to view the form’s results -->
          <RouterLink
            :to="`/results/${createdFormId}`"
            class="inline-block text-purple-300 hover:text-purple-500 transition duration-200 underline"
          >
            🧾 View Results
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import QuestionInput from '../components/QuestionInput.vue'
  import RadioOptionInput from '../components/RadioOptionInput.vue'
  import Link from '../components/Link.vue'
  
  const title = ref('')
  const formQuestions = ref([
    { id: Date.now().toString(), label: '', type: 'short', options: [], required: false }
  ])
  const createdFormId = ref('')
  const baseUrl = window.location.origin
  
  function addQuestion() {
    formQuestions.value.push({
      id: (Date.now() + Math.random()).toString(),
      label: '',
      type: 'short',
      options: [],
      required: false
    })
  }
  
  function removeLastQuestion() {
    if (formQuestions.value.length > 1) {
      formQuestions.value.pop()
    } else {
      alert('You must have at least one question.')
    }
  }
  
  function addOption(questionIndex: number) {
    formQuestions.value[questionIndex].options.push('')
  }
  
  function handleCreateForm() {
    if (!title.value.trim()) {
      alert('Please enter a form title.')
      return
    }
    for (const [i, q] of formQuestions.value.entries()) {
      if (!q.label.trim()) {
        alert(`Question ${i + 1}: please enter the question text.`)
        return
      }
      if (q.type === 'radio') {
        const validOpts = q.options.filter(o => o.trim() !== '')
        if (validOpts.length < 2) {
          alert(`Question ${i + 1}: please add at least two options for single choice.`)
          return
        }
        q.options = validOpts
      }
    }
    const id = Date.now().toString()
    localStorage.setItem(`form-${id}`, JSON.stringify({
      id,
      title: title.value.trim(),
      questions: formQuestions.value.map(q => ({
        id: q.id,
        type: q.type,
        label: q.label.trim(),
        options: q.type === 'radio' ? [...q.options] : [],
        required: q.required
      })),
      responses: []
    }))
    createdFormId.value = id
    title.value = ''
    formQuestions.value = [
      { id: Date.now().toString(), label: '', type: 'short', options: [], required: false }
    ]
  }
  </script>
  