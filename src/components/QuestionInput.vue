<template>
    <input 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      :placeholder="placeholder"
      class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-purple-400 focus:ring-2 focus:ring-purple-600"
      required
    />
  </template>
  
  <script setup lang="ts">
  defineProps<{
    modelValue: string,
    placeholder?: string
  }>()
  
  defineEmits(['update:modelValue'])
  </script>
  