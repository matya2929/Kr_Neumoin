<template>
  <div class="ss" :class="{ open }" ref="root">
    <label v-if="label" class="ss-label">{{ label }}</label>
    <div class="ss-control" @click="toggle">
      <span v-if="selected" class="ss-selected">{{ displayValue(selected) }}</span>
      <span v-else class="ss-placeholder">{{ placeholder }}</span>
      <span class="ss-caret">{{ open ? '▲' : '▼' }}</span>
    </div>
    <div v-if="open" class="ss-popup">
      <input
        ref="searchInput"
        v-model="query"
        type="text"
        placeholder="поиск…"
        class="ss-search"
      />
      <div class="ss-list">
        <button
          v-for="opt in filtered"
          :key="opt[valueKey]"
          class="ss-opt"
          :class="{ active: selected && opt[valueKey] === selected[valueKey] }"
          @click="pick(opt)"
        >
          <span class="ss-opt-main">{{ opt[labelKey] }}</span>
          <span v-if="groupKey && opt[groupKey]" class="ss-opt-group">{{ opt[groupKey] }}</span>
        </button>
        <div v-if="!filtered.length" class="ss-empty">Ничего не найдено</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: Object, default: null },
  label: String,
  placeholder: { type: String, default: 'Выберите…' },
  labelKey: { type: String, default: 'name' },
  valueKey: { type: String, default: 'id' },
  groupKey: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const query = ref('')
const searchInput = ref(null)
const root = ref(null)
const selected = computed(() => props.modelValue)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.options
  return props.options.filter(o =>
    (o[props.labelKey] || '').toLowerCase().includes(q) ||
    (o.originalName || '').toLowerCase().includes(q) ||
    (props.groupKey && (o[props.groupKey] || '').toLowerCase().includes(q))
  )
})

function displayValue(o) {
  if (!o) return ''
  const base = o[props.labelKey]
  if (props.groupKey && o[props.groupKey]) return `${base} — ${o[props.groupKey]}`
  return base
}

function toggle() {
  open.value = !open.value
  if (open.value) nextTick(() => searchInput.value?.focus())
}
function close() { open.value = false; query.value = '' }
function pick(o) { emit('update:modelValue', o); close() }
watch(open, v => { if (!v) query.value = '' })

function onDocMouseDown(e) {
  if (root.value && !root.value.contains(e.target)) close()
}
onMounted(() => document.addEventListener('mousedown', onDocMouseDown))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocMouseDown))
</script>

<style scoped>
.ss { position: relative; }
.ss-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.ss-control {
  background: var(--bg-1);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 0.7em 0.9em;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--text);
  cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.ss-control:hover { border-color: var(--gold-deep); }
.ss.open .ss-control { border-color: var(--gold); box-shadow: 0 0 0 1px var(--gold), 0 0 12px var(--gold-glow); }
.ss-placeholder { color: var(--text-faint); }
.ss-caret { color: var(--gold); font-size: 0.7rem; }
.ss-popup {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: var(--surface);
  border: 1px solid var(--gold-deep);
  border-radius: var(--radius);
  z-index: 30;
  box-shadow: 0 12px 32px rgba(0,0,0,0.5);
  overflow: hidden;
}
.ss-search {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--border);
  background: var(--bg-1);
  border-radius: 0;
}
.ss-search:focus { box-shadow: none; border-bottom-color: var(--gold); }
.ss-list { max-height: 280px; overflow-y: auto; }
.ss-opt {
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  width: 100%;
  padding: 0.55em 0.9em;
  background: transparent;
  border: none;
  border-radius: 0;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.85rem;
  text-align: left;
  letter-spacing: 0;
  text-transform: none;
  cursor: pointer;
  transition: background var(--transition), color var(--transition);
}
.ss-opt:hover { background: rgba(245,197,24,0.08); color: var(--gold); box-shadow: none; }
.ss-opt.active { background: rgba(245,197,24,0.12); color: var(--gold); }
.ss-opt-group {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-faint);
}
.ss-empty {
  padding: 0.8em;
  color: var(--text-faint);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-align: center;
}
</style>
