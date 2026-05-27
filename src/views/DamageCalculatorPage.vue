<template>
  <div class="calc fade-in">
    <header class="page-head">
      <div class="terminal-line">// БАЛЛИСТИЧЕСКИЙ АНАЛИЗАТОР</div>
      <h1>Расчёт урона</h1>
      <p class="muted">
        Выберите оружие и цель, чтобы оценить эффективность стрельбы.
        Уровни брони соответствуют классификации Министерства Обороны Супер-Земли.
      </p>
    </header>

    <div class="grid-2">
      <SearchSelect
        v-model="weapon"
        :options="weapons"
        label="Оружие"
        placeholder="Выберите оружие…"
        label-key="name"
        value-key="id"
        group-key="categoryLabel"
      />
      <SearchSelect
        v-model="enemy"
        :options="enemies"
        label="Цель (враг)"
        placeholder="Выберите врага…"
        label-key="name"
        value-key="id"
        group-key="factionLabel"
      />
    </div>

    <div class="result-area">
      <div v-if="!weapon || !enemy" class="placeholder card">
        <div class="placeholder-title">Ожидание ввода целеуказания</div>
        <div class="placeholder-sub">
          Выберите оружие и врага в полях выше. Затем терминал рассчитает
          вероятный исход применения силы.
        </div>
      </div>

      <div v-else class="result card" :class="resultClass">
        <div class="result-head">
          <div class="badge" :class="resultClass">{{ result.title }}</div>
          <div class="value">
            <template v-if="result.verdict === 'ricochet'">—</template>
            <template v-else>{{ result.value }}</template>
          </div>
        </div>

        <div class="meta">
          <div class="meta-block">
            <div class="meta-label">Оружие</div>
            <div class="meta-name">{{ weapon.name }}</div>
            <div class="stat-mini">
              <span>Урон</span><b>{{ weapon.damage }}</b>
            </div>
            <div class="stat-mini">
              <span>Прочностной урон</span><b>{{ weapon.durableDamage }}</b>
            </div>
            <div class="stat-mini">
              <span>AP</span><b>{{ weapon.armorPenetrationLevel }}</b>
            </div>
          </div>

          <div class="vs">VS</div>

          <div class="meta-block">
            <div class="meta-label">Цель</div>
            <div class="meta-name">{{ enemy.name }}</div>
            <div class="stat-mini">
              <span>Фракция</span><b>{{ enemy.factionLabel }}</b>
            </div>
            <div class="stat-mini">
              <span>Броня</span><b>{{ enemy.armorLabel }} ({{ enemy.armorLevel }})</b>
            </div>
            <div class="stat-mini">
              <span>HP</span><b>{{ enemy.health }}</b>
            </div>
            <div class="stat-mini">
              <span>Процент прочности</span><b>{{ Math.round((enemy.durabilityPercent || 0) * 100) }}%</b>
            </div>
          </div>
        </div>

        <p class="details">{{ result.details }}</p>
      </div>
    </div>

    <section class="formula card">
      <h3>Формула расчёта</h3>
      <ul class="formula-list">
        <li>
          <span class="tag">AP &lt; Броня</span>
          <span>Снаряд рикошетит. Цель не получает урона.</span>
        </li>
        <li>
          <span class="tag gold">AP = Броня</span>
          <span>
            Только при совпадении брони учитывается прочностной урон:
            <code>(прочностной урон + основной урон × процент прочности цели) × 60%</code>.
          </span>
        </li>
        <li>
          <span class="tag">AP &gt; Броня</span>
          <span>
            Штрафа брони нет, но прочностной урон не добавляется:
            <code>основной урон × процент прочности цели</code>.
          </span>
        </li>
      </ul>

      <h4>Уровни брони</h4>
      <div class="armor-levels">
        <span class="tag" v-for="lv in ARMOR_LEVELS" :key="lv.value">
          {{ lv.value }} · {{ lv.label }}
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SearchSelect from '../components/SearchSelect.vue'
import { getAllWeaponsFlat, getAllEnemiesFlat } from '../services/api.js'
import { calculateDamage, ARMOR_LEVELS } from '../services/damageCalculator.js'

const weapons = ref([])
const enemies = ref([])
const weapon = ref(null)
const enemy = ref(null)

const result = computed(() => calculateDamage(weapon.value, enemy.value))
const resultClass = computed(() => result.value ? result.value.verdict : '')

onMounted(async () => {
  weapons.value = await getAllWeaponsFlat()
  enemies.value = await getAllEnemiesFlat()
})
</script>

<style scoped>
.calc { display: flex; flex-direction: column; gap: 1.2rem; }
.page-head { margin-bottom: 0; }

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.placeholder {
  text-align: center;
  padding: 2.4rem 1rem;
  border-style: dashed;
  background: transparent;
}
.placeholder-title {
  font-family: var(--font-display);
  color: var(--gold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}
.placeholder-sub { color: var(--text-muted); font-size: 0.9rem; }

.result { padding: 1.5rem; }
.result.ricochet { border-color: var(--danger); }
.result.partial  { border-color: var(--gold); }
.result.full     { border-color: var(--success); }

.result-head {
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  margin-bottom: 1rem;
}
.badge {
  font-family: var(--font-display);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.85rem;
  padding: 0.4em 0.8em;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
}
.badge.ricochet { color: var(--danger); border-color: var(--danger); background: rgba(212,69,58,0.07); }
.badge.partial  { color: var(--gold);   border-color: var(--gold);   background: rgba(245,197,24,0.07); }
.badge.full     { color: var(--success); border-color: var(--success); background: rgba(116,176,74,0.07); }

.value {
  font-family: var(--font-display);
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--gold);
  line-height: 1;
}
.result.ricochet .value { color: var(--danger); }
.result.full .value { color: var(--success); }

.meta {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
  border-top: 1px dashed var(--border);
  border-bottom: 1px dashed var(--border);
  padding: 1rem 0;
  margin-bottom: 1rem;
}
.meta-block {
  display: flex; flex-direction: column; gap: 4px;
  min-width: 0;
}
.meta-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.meta-name {
  font-family: var(--font-display);
  color: var(--gold);
  font-size: 1.05rem;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
}
.stat-mini {
  display: flex; justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
}
.stat-mini b { color: var(--text); }
.vs {
  font-family: var(--font-display);
  color: var(--text-faint);
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  text-align: center;
}

.details {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text);
  background: var(--bg-1);
  padding: 0.8rem 1rem;
  border-left: 2px solid var(--gold);
  border-radius: var(--radius);
  margin: 0;
}

.formula h3 { color: var(--gold); margin-top: 0; }
.formula h4 { margin-top: 1rem; }
.formula-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.formula-list li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.formula-list code {
  background: var(--bg-1);
  padding: 1px 6px;
  color: var(--gold);
  font-size: 0.85em;
  border-radius: var(--radius);
}
.armor-levels {
  display: flex; flex-wrap: wrap; gap: 0.4rem;
}

@media (max-width: 700px) {
  .grid-2 { grid-template-columns: 1fr; }
  .meta { grid-template-columns: 1fr; }
  .vs { display: none; }
}
</style>
