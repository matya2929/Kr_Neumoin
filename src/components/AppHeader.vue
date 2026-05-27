<template>
  <header class="hdr">
    <div class="hdr-side left">
      <button class="icon-btn" @click="$emit('toggle-sidebar')" aria-label="Меню" title="Меню">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
      <img :src="diverIcon" alt="" class="emblem" />
    </div>

    <div class="hdr-center">
      <span class="terminal-line">// СЕКТОР SE-01 ::</span>
      <h1 class="title">{{ title }}</h1>
    </div>

    <div class="hdr-side right">
      <img :src="diverIcon" alt="" class="emblem" />
      <div v-if="user" class="user-block">
        <div class="user-name">{{ user.nickname }}</div>
        <div class="user-rank">{{ user.rank || 'без звания' }}</div>
        <button class="ghost small" @click="$emit('logout')">Выход</button>
      </div>
      <button v-else class="primary" @click="$emit('open-auth')">Вход</button>
    </div>
  </header>
</template>

<script setup>
import diverIcon from '../assets/ui/ikonka-daiverov.jpg'
defineProps({
  title: String,
  user: { type: Object, default: null }
})
defineEmits(['open-auth', 'toggle-sidebar', 'logout'])
</script>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1.2rem;
  background:
    linear-gradient(to bottom, #000 0%, #0a0c10 100%);
  border-bottom: 1px solid var(--gold-deep);
  box-shadow: 0 1px 0 rgba(245,197,24,0.18), 0 8px 32px rgba(0,0,0,0.6);
}
.hdr-side { display: flex; align-items: center; gap: 0.8rem; }
.hdr-side.right { justify-content: flex-end; }
.hdr-center { text-align: center; }
.terminal-line { display: block; font-size: 0.7rem; opacity: 0.6; }
.title {
  display: inline-flex;
  align-items: baseline;
  margin: 0;
  font-size: 1.15rem;
  color: var(--gold);
}
.emblem {
  height: 28px; width: 28px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--gold-deep);
  filter: drop-shadow(0 0 6px rgba(245,197,24,0.25));
}
.icon-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--gold);
  padding: 0.35em;
  width: 38px; height: 38px;
  display: inline-flex; align-items: center; justify-content: center;
  letter-spacing: 0;
}
.icon-btn:hover {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
  box-shadow: 0 0 0 1px var(--gold), 0 0 18px var(--gold-glow);
}
.user-block {
  display: flex; flex-direction: column; align-items: flex-end;
  gap: 2px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.2;
  margin-right: 0.5rem;
}
.user-name { color: var(--gold); font-weight: 600; letter-spacing: 0.05em; }
.user-rank { color: var(--text-muted); font-size: 0.7rem; }
button.small { padding: 0.35em 0.7em; font-size: 0.7rem; margin-top: 2px; }
@media (max-width: 720px) {
  .hdr { padding: 0.5rem 0.8rem; gap: 0.4rem; }
  .terminal-line { display: none; }
  .title { font-size: 0.95rem; }
  .emblem { display: none; }
  .user-block { display: none; }
}
</style>
