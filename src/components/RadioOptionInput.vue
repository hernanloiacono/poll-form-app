<template>
    <div class="flex items-center space-x-2 mb-2">
      <input 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        :placeholder="placeholder"
        class="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-indigo-400 focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    modelValue: string,
    placeholder?: string
  }>()
  
  defineEmits(['update:modelValue'])
  </script>
  