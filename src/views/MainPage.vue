<template>
  <div class="main fade-in">
    <section class="hero">
      <div class="hero-text">
        <div class="terminal-line">Сообщение с Супер Земли . Министерство Правды</div>
        <h1>Демократический центр приветствия</h1>
        <p class="lead">
          Сограждане, ваше присутствие здесь зафиксировано. Это центральный
          информационный терминал Адских Десантников. Получайте сведения об
          арсенале, врагах Управляемой Демократии и оптимальном применении силы.
        </p>
        <p class="muted">
          Управляемая Демократия — высшее достижение человечества. Каждый адский
          десантник — гражданин, чей долг священен.
        </p>
      </div>

      <div class="hero-flag">
        <img :src="flag" alt="Флаг Супер-Земли" />
        <div class="flag-cap">Флаг Супер-Земли</div>
      </div>
    </section>

    <div class="divider" />

    <section class="anthem card">
      <div class="anthem-head">
        <h2>Гимн Супер-Земли</h2>
        <div class="anthem-actions">
          <button class="ghost small" @click="expanded = !expanded">
            {{ expanded ? 'Свернуть текст' : 'Показать весь текст' }}
          </button>
        </div>
      </div>

      <pre class="anthem-lyrics">{{ visibleLyrics }}</pre>
    </section>

    <section class="propaganda card">
      <h2>Боевой приказ</h2>
      <p class="propaganda-text">
        «Адские десантники, несите демократию туда, где ей сопротивляются.»
      </p>
      <div class="propaganda-sub muted small">
        — Министерство Обороны Супер-Земли
      </div>
    </section>

    <div class="divider" />

    <section class="stats-row">
      <div class="kpi">
        <div class="kpi-label">Освобождено планет</div>
        <div class="kpi-value">21</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Активные фракции</div>
        <div class="kpi-value">3</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Свободность сектора</div>
        <div class="kpi-value">100%</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Лояльность граждан</div>
        <div class="kpi-value">100%</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import flag from '../assets/ui/super-earth-flag.png'

const expanded = ref(false)
const anthemLines = [
  'Царство свободы - над каждой звездой!',
  'Кровь граждан прольётся за праведный бой.',
  'Славь всех погибших и встань в общий строй!',
  '',
  'В сердце держи веру в режим,',
  'Ведь с не мир людей непобедим.',
  'Сомнения - прочь! Един наш язык.',
  '',
  'Мощь демократии - в сильной руке.',
  'Гнев усомнившимся явим в огне.',
  'Флаг наш трёхцветный миры все объял.',
  'Правды с надеждой воздвиг идеал. Галактика ждёт жизни оплот.',
  'По черепам идти вперёд.',
  'С собой пронесли честь Супер-Земли.',
  'Волной ненасытной всё смели.',
  '',
  'Жертвуем жизнь в сотнях дружин.',
  'За меньшее рай недостижим.',
  'Встань же, народ! Ввысь в небосвод!',
  'Супер-Земли горит восход',
  'Сво-бод!'
]
const visibleLyrics = computed(() => (expanded.value ? anthemLines : anthemLines.slice(0, 3)).join('\n'))

</script>

<style scoped>
.main { display: flex; flex-direction: column; gap: 1.5rem; }

.hero {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  align-items: center;
}
.hero-text .lead {
  color: var(--text);
  font-size: 1.05rem;
  max-width: 56ch;
}
.hero-flag {
  border: 1px solid var(--gold-deep);
  background: linear-gradient(135deg, #1a2238, #0b0f1a);
  padding: 1rem;
  border-radius: var(--radius-lg);
  text-align: center;
}
.hero-flag img { width: 100%; height: auto; border: 1px solid var(--border); border-radius: var(--radius); }
.flag-cap {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
}

.anthem-head { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.anthem-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0.5rem; }
.anthem-lyrics {
  font-family: 'Georgia', serif;
  font-style: italic;
  color: var(--text);
  font-size: 1rem;
  line-height: 1.7;
  border-left: 2px solid var(--gold);
  padding-left: 1rem;
  margin: 0.6rem 0;
  white-space: pre-wrap;
  background: transparent;
}
.small { font-size: 0.8rem; }
button.small { padding: 0.4em 0.9em; font-size: 0.75rem; }

.propaganda {
  background:
    repeating-linear-gradient(45deg, rgba(245,197,24,0.025) 0 10px, transparent 10px 20px),
    var(--surface);
  border-left: 3px solid var(--gold);
}
.propaganda-text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  line-height: 1.3;
  margin: 0.4rem 0 0.6rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.kpi {
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 1px solid var(--gold-deep);
  border-radius: var(--radius-lg);
  padding: 1rem;
  text-align: center;
}
.kpi-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.kpi-value {
  font-family: var(--font-display);
  color: var(--gold);
  font-size: 2.2rem;
  font-weight: 600;
  margin-top: 0.4rem;
  letter-spacing: 0.04em;
}

@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}
</style>
