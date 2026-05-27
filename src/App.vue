<template>
  <div class="app-shell">
    <AppHeader
      :user="user"
      :title="currentTitle"
      @open-auth="openAuth"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @logout="logout"
    />

    <GlobalAudio v-show="isMainPage" />

    <div class="layout">
      <SidebarMenu :open="sidebarOpen" @close="sidebarOpen = false" />
      <main class="content">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" :key="$route.fullPath" :user="user" />
          </transition>
        </router-view>
      </main>
    </div>

    <FooterSection />

    <AuthModal
      v-if="authOpen"
      @close="authOpen = false"
      @authed="onAuthed"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import SidebarMenu from './components/SidebarMenu.vue'
import FooterSection from './components/FooterSection.vue'
import AuthModal from './components/AuthModal.vue'
import GlobalAudio from './components/GlobalAudio.vue'

const route = useRoute()
const sidebarOpen = ref(false)
const authOpen = ref(false)
const user = ref(null)
const USER_SESSION_KEY = 'helldivers_current_user'

const currentTitle = computed(() => route.meta?.title || 'Helldivers 2')
const isMainPage = computed(() => route.path === '/')

function openAuth() {
  authOpen.value = true
}

function onAuthed(u) {
  user.value = u
  authOpen.value = false

  try {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(u))
  } catch {}
}

function logout() {
  user.value = null

  try {
    localStorage.removeItem(USER_SESSION_KEY)
  } catch {}
}

onMounted(() => {
  try {
    const savedUser = localStorage.getItem(USER_SESSION_KEY)
    if (savedUser) user.value = JSON.parse(savedUser)
  } catch {
    user.value = null
  }
})
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
}
.layout {
  flex: 1;
  display: flex;
  position: relative;
  min-height: 0;
}
.content {
  flex: 1;
  padding: 2rem 2.5rem;
  max-width: 100%;
  overflow-x: hidden;
}
@media (max-width: 720px) {
  .content { padding: 1.2rem; }
}

.page-enter-active, .page-leave-active {
  transition: opacity .25s ease, transform .25s ease;
}
.page-enter-from { opacity: 0; transform: translateY(8px); }
.page-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
