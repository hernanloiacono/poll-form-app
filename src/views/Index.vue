<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-6 flex flex-col items-center justify-center">
      <div class="w-full max-w-xl bg-black bg-opacity-60 p-6 rounded-2xl shadow-lg border border-purple-500">
        <h1 class="text-3xl font-bold mb-4 text-center">Welcome</h1>
        <p class="text-center mb-6 text-lg">Select an option to create a Poll or a Form:</p>
        
        <!-- Buttons to navigate to create poll or form -->
        <div class="flex justify-center space-x-4">
          <button @click="navigateTo('poll')" class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg">
            Create Poll
          </button>
          <button @click="navigateTo('form')" class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg">
            Create Form
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const navigateTo = (type: string) => {
    if (type === 'poll') {
      router.push('/create-poll')  // Navigates to the Create Poll page
    } else if (type === 'form') {
      router.push('/create-form')  // Navigates to the Create Form page
    }
  }
  </script>
  
  