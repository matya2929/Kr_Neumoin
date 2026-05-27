<template>
  <div class="enemies fade-in">
    <header class="page-head">
      <div class="terminal-line">База данных врагов</div>
      <h1>Враги Демократии</h1>
      <p class="muted">
        Три фракции угрожают Управляемой Демократии Супер-Земли.
        Знание противника — основа победы.
      </p>
    </header>

    <div v-if="!enemies">Загрузка…</div>
    <div v-else>
      <AccordionSection
        v-for="(faction, key) in enemies.factions"
        :key="key"
        :title="faction.label"
        :subtitle="faction.description"
        :default-open="key === 'terminids'"
      >
        <template #default>
          <div class="faction-head">
            <img :src="iconSrc(faction.icon)" :alt="faction.label" class="faction-icon" />
            <div class="faction-meta">
              <div class="orig">{{ faction.originalName }}</div>
            </div>
          </div>

          <div class="grid">
            <EnemyCard v-for="e in faction.enemies" :key="e.id" :enemy="e" />
          </div>
        </template>
      </AccordionSection>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getEnemies } from '../services/api.js'
import AccordionSection from '../components/AccordionSection.vue'
import EnemyCard from '../components/EnemyCard.vue'

import terminidsIcon from '../assets/factions/terminids.png'
import automatonsIcon from '../assets/factions/automatons.png'
import illuminateIcon from '../assets/factions/illuminate.png'

const iconMap = {
  'factions/terminids.png': terminidsIcon,
  'factions/automatons.png': automatonsIcon,
  'factions/illuminate.png': illuminateIcon
}

function iconSrc(p) { return iconMap[p] || '' }

const enemies = ref(null)
onMounted(async () => { enemies.value = await getEnemies() })
</script>

<style scoped>
.enemies { display: flex; flex-direction: column; gap: 0.6rem; }
.page-head { margin-bottom: 0.5rem; }
.faction-head {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px dashed var(--border);
}
.faction-icon {
  width: 56px; height: 56px;
  object-fit: contain;
  background: rgba(245,197,24,0.05);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 6px;
  filter: drop-shadow(0 0 6px rgba(245,197,24,0.15));
}
.faction-meta { display: flex; flex-direction: column; gap: 2px; }
.orig {
  font-family: var(--font-mono);
  color: var(--text-muted);
  font-size: 0.8rem;
  letter-spacing: 0.05em;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
</style>
