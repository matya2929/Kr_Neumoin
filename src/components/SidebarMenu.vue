<template>
  <aside class="sidebar" :class="{ open }">
    <button class="close" @click="$emit('close')" aria-label="Закрыть">×</button>
    <nav>
      <div class="section-label">// НАВИГАЦИЯ</div>
      <router-link v-for="item in items" :key="item.to" :to="item.to" class="nav-item" @click="$emit('close')">
        <span class="dot" />
        {{ item.label }}
      </router-link>

      <div class="section-label">// ХРОНИКИ ВОЙНЫ</div>
      <div class="chronicles-note">
        В связи с недавним саботажем министерства правды недемократичными автоматонами, требуется восстановление архивных записей. Раздел временно недоступен.
      </div>

      <div class="footer-note">
        Управляемая Демократия<br>
        Сектор SE-01 / Готовность 100%
      </div>
    </nav>
  </aside>
  <div v-if="open" class="sidebar-backdrop" @click="$emit('close')"></div>
</template>

<script setup>
defineProps({ open: Boolean })
defineEmits(['close'])
const items = [
  { to: '/',           label: 'Главная' },
  { to: '/arsenal',    label: 'Арсенал' },
  { to: '/enemies',    label: 'Враги Демократии' },
  { to: '/calculator', label: 'Расчёт урона' },
  { to: '/comms',      label: 'Коммуникация Адского Десанта' }
]
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0; left: 0;
  height: 100vh;
  width: 280px;
  padding: 5rem 1.2rem 1.2rem;
  background: linear-gradient(180deg, #0a0c10 0%, #0d1117 100%);
  border-right: 1px solid var(--gold-deep);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  z-index: 60;
  display: flex; flex-direction: column;
  box-shadow: 8px 0 24px rgba(0,0,0,0.4);
}
.sidebar.open { transform: translateX(0); }

.close {
  position: absolute;
  top: 0.7rem; right: 0.8rem;
  width: 36px; height: 36px;
  background: transparent;
  color: var(--gold);
  border: 1px solid transparent;
  font-size: 1.4rem;
  line-height: 1;
  padding: 0;
}
.close:hover {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
  box-shadow: 0 0 0 1px var(--gold), 0 0 18px var(--gold-glow);
}

nav { display: flex; flex-direction: column; gap: 4px; }
.section-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  margin: 1rem 0 0.4rem;
  text-transform: uppercase;
}
.section-label:first-of-type { margin-top: 0; }

.nav-item {
  display: flex; align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.8rem;
  color: var(--text);
  font-family: var(--font-display);
  letter-spacing: 0.05em;
  font-size: 0.9rem;
  text-transform: uppercase;
  border-left: 2px solid transparent;
  transition: all var(--transition);
  cursor: pointer;
}
.nav-item:hover { background: rgba(245,197,24,0.06); border-left-color: var(--gold); color: var(--gold); }
.nav-item.router-link-active {
  background: rgba(245,197,24,0.1);
  border-left-color: var(--gold);
  color: var(--gold);
}
.nav-item.disabled { color: var(--text-faint); cursor: default; }
.nav-item.disabled:hover { background: transparent; border-left-color: transparent; color: var(--text-faint); }

.dot {
  width: 6px; height: 6px;
  background: var(--gold);
  border-radius: 50%;
  box-shadow: 0 0 6px var(--gold-glow);
  flex-shrink: 0;
}
.nav-item.disabled .dot { background: var(--text-faint); box-shadow: none; }
.chronicles-note {
  margin: 0.2rem 0 0.6rem;
  padding: 0.75rem;
  border: 1px dashed var(--border);
  background: rgba(245,197,24,0.035);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.45;
}

.footer-note {
  margin-top: auto;
  padding-top: 1.2rem;
  border-top: 1px dashed var(--border);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-faint);
  letter-spacing: 0.05em;
}

.sidebar-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 55;
  animation: fadeIn .2s;
}

@media (max-width: 720px) {
  .sidebar { width: 80vw; }
}
</style>
