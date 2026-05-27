<template>
  <footer class="ftr">
    <div class="row">
      <div class="col">
        <div class="terminal-line">Министерство Информации Супер-Земли</div>
        <div class="muted small">Права: Неумоин Матвей Александрович</div>
      </div>
      <div class="col center">
        <div class="muted small">Партнерство:</div>
        <div class="muted small">Telegram: @matya2929</div>
        <div class="muted small">Почта: matveneumoin@gmail.com</div>
      </div>
      <div class="col right">
        <div class="muted small">Источник данных: Helldivers Wiki / Fandom</div>
        <div class="muted small">&copy; SE-2184. За управляемую демократию.</div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  border-top: 1px solid var(--gold-deep);
  background: linear-gradient(0deg, #000 0%, #0a0c10 100%);
  padding: 1.2rem 1.5rem;
  margin-top: auto;
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
}
.col { display: flex; flex-direction: column; gap: 4px; }
.col.center { text-align: center; align-items: center; }
.col.right { text-align: right; align-items: flex-end; }
.small {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}
@media (max-width: 720px) {
  .row { grid-template-columns: 1fr; gap: 0.8rem; }
  .col.center, .col.right { text-align: left; align-items: flex-start; }
}
</style>
