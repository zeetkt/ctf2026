import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/css/main.css'

import Index from './components/Index.vue'
import Booking from './components/Booking.vue'
import Connection from './components/Connection.vue'
import Contact from './components/Contact.vue'

const routes = [
    { path: '/', component: Index },
    { path: '/Booking', component: Booking },
    { path: '/Connection', component: Connection },
    { path: '/Contact', component: Contact }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')