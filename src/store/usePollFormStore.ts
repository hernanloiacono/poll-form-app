// src/store/usePollFormStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Poll, Form } from '../types'

export const useStore = defineStore('pollFormStore', () => {
  const polls = ref<Poll[]>([])
  const forms = ref<Form[]>([])

  const addPoll = (poll: Poll) => {
    polls.value.push(poll)
  }

  const addForm = (form: Form) => {
    forms.value.push(form)
  }

  return { polls, forms, addPoll, addForm }
})
