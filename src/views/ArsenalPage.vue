<template>
  <div class="arsenal fade-in">
    <header class="page-head">
      <div class="terminal-line">// АРСЕНАЛ · АДСКИЙ ДЕСАНТ</div>
      <h1>Арсенал</h1>
      <p class="muted">
        Полный реестр снаряжения, разрешённого к выдаче Адским Десантникам.
      </p>
    </header>

    <AccordionSection title="Броня" :subtitle="armorSubtitle" :default-open="true">
      <div v-if="!armor">Загрузка…</div>
      <div v-else>
        <AccordionSection
          v-for="(cat, key) in armor.categories"
          :key="key"
          :title="cat.label"
          :subtitle="cat.description"
        >
          <div class="grid">
            <ItemCard v-for="a in cat.items" :key="a.id" :item="a" :badge="`Защита ${a.armorRating}`">
              <template #stats>
                <div class="stat"><span class="label">Скорость</span><span class="value">{{ a.speed }}</span></div>
                <div class="stat"><span class="label">Регенерация выносл.</span><span class="value">{{ a.staminaRegen }}</span></div>
                <div class="stat"><span class="label">Защищённость</span><span class="value">{{ a.armorRating }}</span></div>
              </template>
            </ItemCard>
          </div>
        </AccordionSection>
      </div>
    </AccordionSection>

    <AccordionSection title="Оружие" :subtitle="weaponsSubtitle">
      <div v-if="!weapons">Загрузка…</div>
      <div v-else>
        <AccordionSection
          v-for="(cat, key) in weapons.categories"
          :key="key"
          :title="cat.label"
          :subtitle="cat.description"
        >
          <div class="grid">
            <ItemCard v-for="w in cat.items" :key="w.id" :item="w" :badge="`AP ${w.armorPenetrationLevel}`">
              <template #stats>
                <div class="stat"><span class="label">Урон</span><span class="value">{{ w.damage }}</span></div>
                <div class="stat"><span class="label">Прочностной урон</span><span class="value">{{ w.durableDamage }}</span></div>
                <div class="stat"><span class="label">Отдача</span><span class="value">{{ w.recoil }}</span></div>
                <div class="stat"><span class="label">Эргономика</span><span class="value">{{ w.ergonomics }}</span></div>
                <div class="stat"><span class="label">Скорострельность</span><span class="value">{{ w.fireRate }}/мин</span></div>
                <div class="stat"><span class="label">Магазин</span><span class="value">{{ w.capacity }}</span></div>
                <div class="stat"><span class="label">Магазинов</span><span class="value">{{ w.magazines }}</span></div>
                <div class="stat"><span class="label">Бронепробитие (AP)</span><span class="value">{{ w.armorPenetrationLevel }}</span></div>
              </template>
            </ItemCard>
          </div>
        </AccordionSection>
      </div>
    </AccordionSection>

    <AccordionSection title="Гранаты" :subtitle="grenadesSubtitle">
      <div v-if="!grenades">Загрузка…</div>
      <div v-else class="grid">
        <ItemCard v-for="g in grenades.items" :key="g.id" :item="g" :badge="`R ${g.radius}м`">
          <template #stats>
            <div class="stat"><span class="label">Урон</span><span class="value">{{ g.damage }}</span></div>
            <div class="stat"><span class="label">Радиус</span><span class="value">{{ g.radius }} м</span></div>
            <div class="stat"><span class="label">Время детонации</span><span class="value">{{ g.detonationTime }} с</span></div>
          </template>
        </ItemCard>
      </div>
    </AccordionSection>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getArmor, getWeapons, getGrenades } from '../services/api.js'
import AccordionSection from '../components/AccordionSection.vue'
import ItemCard from '../components/ItemCard.vue'

const armor = ref(null)
const weapons = ref(null)
const grenades = ref(null)

const armorSubtitle = computed(() => armor.value
  ? `${Object.values(armor.value.categories).reduce((s,c)=>s+c.items.length,0)} комплектов`
  : '')
const weaponsSubtitle = computed(() => weapons.value
  ? `${Object.values(weapons.value.categories).reduce((s,c)=>s+c.items.length,0)} образцов`
  : '')
const grenadesSubtitle = computed(() => grenades.value
  ? `${grenades.value.items.length} типов`
  : '')

onMounted(async () => {
  armor.value = await getArmor()
  weapons.value = await getWeapons()
  grenades.value = await getGrenades()
})
</script>

<style scoped>
.arsenal { display: flex; flex-direction: column; gap: 0.6rem; }
.page-head { margin-bottom: 0.5rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
</style>
