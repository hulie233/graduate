import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'//入口

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router'
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-persistedstate-plugin'

import locale from 'element-plus/dist/locale/zh-cn.js'//导入中文包



const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()

pinia.use(persist)
app.use(ElementPlus,{locale})
app.use(router)
app.use(pinia)

app.mount('#app')