import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import CreatePoll from '../views/CreatePoll.vue'
import AnswerPoll from '../views/AnswerPoll.vue'
import CreateForm from '../views/CreateForm.vue'
import AnswerForm from '../views/AnswerForm.vue'
import Results from '../views/Results.vue'

const routes = [
  { path: '/', component: Index  },
  { path: '/create-poll', component: CreatePoll },
  { path: '/answer-poll/:id', component: AnswerPoll },
  { path: '/create-form', component: CreateForm },
  { path: '/answer-form/:id', component: AnswerForm },
  { path: '/results/:id', component: Results},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
