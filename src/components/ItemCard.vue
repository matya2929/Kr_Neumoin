<template>
  <article class="card item-card fade-in">
    <div class="img-wrap">
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.name"
        loading="lazy"
        @error="onImgErr"
      />
      <div v-else class="img-fallback">
        <span>Изображение недоступно</span>
      </div>
    </div>

    <header class="card-head">
      <div>
        <h3>{{ item.name }}</h3>
        <div v-if="item.originalName" class="orig">{{ item.originalName }}</div>
      </div>
      <span v-if="badge" class="tag gold">{{ badge }}</span>
    </header>

    <p class="desc">{{ item.description }}</p>

    <div class="stats">
      <slot name="stats" />
    </div>

    <div v-if="item.specialTraits && item.specialTraits.length" class="traits">
      <span v-for="t in item.specialTraits" :key="t" class="tag">{{ t }}</span>
    </div>

    <div v-if="item.passive" class="passive">
      <div class="passive-label">Пассивный перк</div>
      <div class="passive-name">{{ item.passive }}</div>
      <div v-if="item.passiveDescription" class="passive-desc">{{ item.passiveDescription }}</div>
    </div>

  </article>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
  badge: { type: String, default: '' }
})
function onImgErr(e) {
  e.target.style.display = 'none'
  const fb = e.target.parentElement.querySelector('.img-fallback')
  if (fb) fb.style.display = 'flex'
  else {
    const div = document.createElement('div')
    div.className = 'img-fallback'
    div.innerHTML = '<span>Изображение недоступно</span>'
    e.target.parentElement.appendChild(div)
  }
}
</script>

<style scoped>
.item-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem;
}
.img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background:
    linear-gradient(135deg, #0c1018, #161b27);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.img-wrap img {
  max-width: 100%; max-height: 100%;
  object-fit: contain;
}
.img-fallback {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px;
  color: var(--text-faint);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-align: center;
  padding: 0.5rem;
}
.img-fallback small { color: var(--text-faint); font-size: 0.65rem; opacity: 0.7; }

.card-head {
  display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;
}
.card-head h3 { margin: 0; color: var(--text); }
.orig {
  font-family: var(--font-mono);
  color: var(--text-muted);
  font-size: 0.7rem;
  margin-top: 2px;
  letter-spacing: 0.05em;
}
.desc {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}
.stats { display: flex; flex-direction: column; }
.traits { display: flex; flex-wrap: wrap; gap: 4px; }
.passive {
  border-top: 1px dashed var(--border);
  padding-top: 0.6rem;
}
.passive-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-faint);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.passive-name {
  color: var(--gold);
  font-family: var(--font-display);
  letter-spacing: 0.04em;
  margin-top: 2px;
}
.passive-desc { font-size: 0.8rem; color: var(--text-muted); margin-top: 2px; }

</style>
