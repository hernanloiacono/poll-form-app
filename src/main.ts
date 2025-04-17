import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/main.css'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)

// Usamos Pinia como plugin
app.use(createPinia())
app.use(router)

app.mount('#app')