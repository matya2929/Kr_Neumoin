<template>
  <article class="card enemy-card fade-in">
    <div class="img-wrap">
      <img
        v-if="enemy.image"
        :src="enemy.image"
        :alt="enemy.name"
        loading="lazy"
        @error="onImgErr"
      />
      <div v-else class="img-fallback">
        <span>Изображение недоступно</span>
      </div>
    </div>

    <header class="card-head">
      <div>
        <h3>{{ enemy.name }}</h3>
        <div v-if="enemy.originalName" class="orig">{{ enemy.originalName }}</div>
      </div>
      <span class="tag" :class="dangerClass">{{ enemy.danger }}</span>
    </header>

    <p class="desc">{{ enemy.description }}</p>

    <div class="stats">
      <div class="stat"><span class="label">Уровень брони</span><span class="value">{{ enemy.armorLabel }} ({{ enemy.armorLevel }})</span></div>
      <div class="stat"><span class="label">Здоровье</span><span class="value">{{ enemy.health }}</span></div>
      <div class="stat"><span class="label">Опасность</span><span class="value">{{ enemy.danger }}</span></div>
      <div class="stat"><span class="label">Процент прочности</span><span class="value">{{ Math.round((enemy.durabilityPercent || 0) * 100) }}%</span></div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ enemy: { type: Object, required: true } })

const dangerClass = computed(() => {
  const d = (props.enemy.danger || '').toLowerCase()
  if (d.includes('крит')) return 'danger'
  if (d.includes('высок')) return 'gold'
  return ''
})

function onImgErr(e) {
  e.target.style.display = 'none'
  const div = document.createElement('div')
  div.className = 'img-fallback'
  div.innerHTML = '<span>Изображение недоступно</span>'
  e.target.parentElement.appendChild(div)
}
</script>

<style scoped>
.enemy-card { display: flex; flex-direction: column; gap: 0.7rem; }
.img-wrap {
  width: 100%;
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, #0c1018, #161b27);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.img-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; }
.img-fallback {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: var(--text-faint);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
.img-fallback small { font-size: 0.65rem; opacity: 0.7; margin-top: 2px; }
.card-head { display: flex; justify-content: space-between; gap: 0.5rem; align-items: flex-start; }
.card-head h3 { margin: 0; color: var(--text); }
.orig { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); margin-top: 2px; }
.desc { margin: 0; font-size: 0.85rem; color: var(--text-muted); }
</style>
