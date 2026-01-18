import './assets/main.css'
import Nav from '../src/components/Nav.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
createPinia().use(piniaPersist)

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('Nav', Nav)

app.use(createPinia())
app.use(router)

app.mount('#app')
