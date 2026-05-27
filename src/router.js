import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from './views/MainPage.vue'
import ArsenalPage from './views/ArsenalPage.vue'
import EnemiesPage from './views/EnemiesPage.vue'
import DamageCalculatorPage from './views/DamageCalculatorPage.vue'
import CommunicationPage from './views/CommunicationPage.vue'

const routes = [
  { path: '/',          name: 'main',     component: MainPage,           meta: { title: 'Демократический центр' } },
  { path: '/arsenal',   name: 'arsenal',  component: ArsenalPage,        meta: { title: 'Арсенал' } },
  { path: '/enemies',   name: 'enemies',  component: EnemiesPage,        meta: { title: 'Враги Демократии' } },
  { path: '/calculator',name: 'calc',     component: DamageCalculatorPage,meta:{ title: 'Расчёт урона' } },
  { path: '/comms',     name: 'comms',    component: CommunicationPage,   meta:{ title: 'Коммуникация Адского Десанта' } }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
