<template>
  <section class="acc">
    <button class="acc-head" @click="toggle" :aria-expanded="isOpen">
      <span class="acc-marker">{{ isOpen ? '▼' : '▶' }}</span>
      <span class="acc-title">{{ title }}</span>
      <span v-if="subtitle" class="acc-sub">{{ subtitle }}</span>
    </button>
    <transition name="acc">
      <div v-show="isOpen" class="acc-body">
        <slot />
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  title: String,
  subtitle: String,
  defaultOpen: { type: Boolean, default: false }
})
const isOpen = ref(props.defaultOpen)
function toggle() { isOpen.value = !isOpen.value }
watch(() => props.defaultOpen, v => { isOpen.value = v })
</script>

<style scoped>
.acc {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  margin-bottom: 1rem;
  background: var(--surface);
  overflow: hidden;
}
.acc-head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9em 1.1em;
  background: var(--bg-2);
  border: none;
  border-bottom: 1px solid transparent;
  color: var(--gold);
  font-family: var(--font-display);
  font-size: 1rem;
  text-align: left;
  border-radius: 0;
  transition: background var(--transition), border-color var(--transition);
}
.acc-head:hover { background: var(--bg-3); box-shadow: none; }
.acc-head[aria-expanded="true"] { border-bottom-color: var(--gold-deep); background: var(--bg-3); }
.acc-marker {
  color: var(--gold);
  font-size: 0.7rem;
  width: 1rem;
  display: inline-block;
}
.acc-title {
  flex: 1;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.acc-sub {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: none;
  letter-spacing: 0;
}
.acc-body {
  padding: 1.2rem;
}
.acc-enter-active, .acc-leave-active {
  transition: max-height .35s ease, opacity .25s ease;
  overflow: hidden;
}
.acc-enter-from, .acc-leave-to {
  max-height: 0;
  opacity: 0;
}
.acc-enter-to, .acc-leave-from {
  max-height: 4000px;
  opacity: 1;
}
</style>
