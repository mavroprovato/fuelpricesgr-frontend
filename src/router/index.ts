import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PrefectureView from '@/views/PrefectureView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/prefecture/:prefecture',
            name: 'prefecture',
            component: PrefectureView,
        }
    ]
})

export default router
