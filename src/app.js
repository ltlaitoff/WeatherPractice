import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import reset from 'reset-css'

createApp(App).use(router).use(reset).mount('#app')
