import {createRouter,createWebHistory} from 'vue-router'

// 导入组件页
import GateVue from '@/views/Gate.vue'
import TheoneVue from '@/views/Theone.vue'

import HomeVue from '@/views/thetwo/Home.vue'
import MedicineVue from '@/views/thetwo/Medicine.vue'
import ArticleVue from '@/views/thetwo/Article.vue'
import EditVue from '@/views/thetwo/Edit.vue'
import JobVue from '@/views/thetwo/Job.vue'

import PersonVue from '@/views/user/Person.vue'
import AvatorVue from '@/views/user/Avator.vue'
import ResetVue from '@/views/user/Reset.vue'

// 定义路由具体路径、绑定组件、链接关系
const routes = [
    {path: '/gate',component: GateVue},
    {
        path: '/',component: TheoneVue,redirect:'/room/home', children: [
            { path: '/room/home', component: HomeVue },
            { path: '/room/medicine', component: MedicineVue },
            { path: '/room/article', component: ArticleVue },
            { path: '/room/edit', component: EditVue },
            { path: '/job', component: JobVue },
            { path: '/user/person', component: PersonVue },
            { path: '/user/avator', component: AvatorVue },
            { path: '/user/reset', component: ResetVue }
        ]
    },
]

// 创建路由器
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

// 导出
export default router
