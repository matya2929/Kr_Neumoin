<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal fade-in">
      <button class="x-close" @click="$emit('close')" aria-label="Закрыть">×</button>

      <div class="tabs">
        <button :class="['tab', mode==='login'   && 'active']" @click="switchMode('login')">Вход</button>
        <button :class="['tab', mode==='register'&& 'active']" @click="switchMode('register')">Регистрация</button>
      </div>

      <form @submit.prevent="onSubmit" novalidate>
        <template v-if="mode === 'register'">
          <label class="field">
            <span>Никнейм <em>*</em></span>
            <input v-model="form.nickname" type="text" maxlength="32" placeholder="Адский_десантник" />
          </label>
          <label class="field">
            <span>Звание <em class="opt">(опционально)</em></span>
            <select v-model="form.rank">
              <option value="">— выберите —</option>
              <option>Рядовой</option>
              <option>Капрал</option>
              <option>Сержант</option>
              <option>Лейтенант</option>
              <option>Капитан</option>
              <option>Майор</option>
              <option>Полковник</option>
              <option>Генерал Демократии</option>
            </select>
          </label>
          <label class="field">
            <span>Уровень игрока <em class="opt">(опционально)</em></span>
            <input v-model.number="form.level" type="number" min="1" max="150" placeholder="1–150" />
          </label>
        </template>

        <label class="field">
          <span>Email <em>*</em></span>
          <input v-model="form.email" type="email" autocomplete="email" placeholder="diver@super-earth.gov" />
        </label>
        <label class="field">
          <span>Пароль <em>*</em></span>
          <input v-model="form.password" type="password" autocomplete="current-password" placeholder="••••••••" />
        </label>

        <div v-if="error" class="error">{{ error }}</div>

        <button type="submit" class="primary submit" :disabled="loading">
          {{ loading ? 'Подключение…' : (mode === 'login' ? 'ВОЙТИ' : 'ЗАРЕГИСТРИРОВАТЬСЯ') }}
        </button>
      </form>

      <p class="hint">
        Тест-десантник: <code>democracy@super-earth.gov</code> / <code>freedom2184</code>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login, register } from '../services/api.js'

const emit = defineEmits(['close', 'authed'])
const mode = ref('login')
const loading = ref(false)
const error = ref('')
const form = reactive({ nickname: '', rank: '', level: null, email: '', password: '' })

function switchMode(m) {
  mode.value = m
  error.value = ''
}

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    const res = mode.value === 'login'
      ? await login({ email: form.email, password: form.password })
      : await register({
          nickname: form.nickname,
          rank: form.rank,
          level: form.level,
          email: form.email,
          password: form.password
        })
    if (!res.ok) { error.value = res.error; return }
    emit('authed', res.user)
  } catch (e) {
    error.value = 'Сбой связи с центром данных.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.x-close {
  position: absolute; top: 0.6rem; right: 0.6rem;
  width: 32px; height: 32px; line-height: 1; padding: 0;
  font-size: 1.4rem;
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-muted);
}
.x-close:hover {
  background: var(--gold);
  border-color: var(--gold);
  color: #000;
  box-shadow: 0 0 0 1px var(--gold), 0 0 18px var(--gold-glow);
}

.tabs {
  display: flex; gap: 0;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid var(--border);
}
.tab {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 0.75em 1em;
  letter-spacing: 0.1em;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  border-radius: 0;
}
.tab:hover {
  color: #000;
  background: var(--gold);
  box-shadow: none;
}
.tab.active { color: var(--gold); border-bottom-color: var(--gold); }

.field {
  display: block;
  margin-bottom: 0.9rem;
}
.field > span {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.field em { color: var(--danger); font-style: normal; }
.field em.opt { color: var(--text-faint); font-size: 0.85em; }

.error {
  border: 1px solid var(--danger);
  background: rgba(212,69,58,0.08);
  color: var(--danger);
  padding: 0.5em 0.75em;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
  border-radius: var(--radius);
}

.submit {
  width: 100%;
  padding: 0.85em;
  font-size: 0.9rem;
  margin-top: 0.4rem;
}

.hint {
  margin: 1rem 0 0;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-faint);
}
.hint code {
  background: var(--bg-1);
  padding: 1px 6px;
  border-radius: var(--radius);
  color: var(--gold);
}
</style>
