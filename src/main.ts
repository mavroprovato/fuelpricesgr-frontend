import { createApp } from 'vue'

import App from '@/App.vue'
import {router} from '@/router';

import '@vuepic/vue-datepicker/dist/main.css'
// Must come after the date picker CSS so its neutral overrides win
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')