<template>
  <div class="comms fade-in">
    <header class="page-head">
      <div class="terminal-line">Канал связи Адского Десанта</div>
      <h1>Коммуникация Адского Десанта</h1>
      <p class="muted">
        Защищённая демонстрационная линия для обмена сообщениями между авторизованными десантниками.
      </p>
    </header>

    <section class="card composer">
      <div v-if="!user" class="locked">
        Для отправки сообщений необходимо войти через кнопку «Вход» в шапке.
      </div>
      <form v-else @submit.prevent="submitMessage">
        <div class="sender">
          Передача от имени: <strong>{{ user.nickname }}</strong>
          <span v-if="user.rank">· {{ user.rank }}</span>
        </div>
        <textarea
          v-model="draft"
          rows="4"
          maxlength="600"
          placeholder="Введите сообщение для канала Адского Десанта…"
        />
        <div class="composer-actions">
          <span class="counter">{{ draft.length }}/600</span>
          <button class="primary" type="submit" :disabled="sending">Отправить</button>
        </div>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </section>

    <section class="messages">
      <article v-for="message in messages" :key="message.id" class="message card">
        <header>
          <div>
            <div class="nickname">{{ message.nickname }}</div>
            <div class="rank">{{ message.rank }}</div>
          </div>
          <time>{{ formatDate(message.createdAt) }}</time>
        </header>
        <p>{{ message.text }}</p>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listMessages, sendMessage } from '../services/api.js'

const props = defineProps({
  user: { type: Object, default: null }
})

const messages = ref([])
const draft = ref('')
const error = ref('')
const sending = ref(false)

function sortMessagesNewestFirst(items) {
  return [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

async function loadMessages() {
  messages.value = sortMessagesNewestFirst(await listMessages())
}

async function submitMessage() {
  error.value = ''
  sending.value = true
  const result = await sendMessage({ user: props.user, text: draft.value })
  sending.value = false
  if (!result.ok) {
    error.value = result.error
    return
  }
  draft.value = ''
  messages.value = sortMessagesNewestFirst([result.message, ...messages.value])
}

function formatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(loadMessages)
</script>

<style scoped>
.comms { display: flex; flex-direction: column; gap: 1rem; }
.page-head { margin-bottom: 0.2rem; }
.composer { border-left: 3px solid var(--gold); }
.locked {
  font-family: var(--font-mono);
  color: var(--text-muted);
  background: var(--bg-1);
  border: 1px dashed var(--border);
  padding: 1rem;
}
.sender {
  font-family: var(--font-mono);
  color: var(--text-muted);
  margin-bottom: 0.7rem;
}
.sender strong { color: var(--gold); }
textarea { resize: vertical; min-height: 120px; }
.composer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.7rem;
  gap: 1rem;
}
.counter {
  font-family: var(--font-mono);
  color: var(--text-faint);
  font-size: 0.75rem;
}
.error {
  margin-top: 0.7rem;
  color: var(--danger);
  font-family: var(--font-mono);
  font-size: 0.82rem;
}
.messages {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.message { padding: 1rem; }
.message header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px dashed var(--border);
  padding-bottom: 0.55rem;
  margin-bottom: 0.7rem;
}
.nickname {
  font-family: var(--font-display);
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.rank, time {
  font-family: var(--font-mono);
  color: var(--text-faint);
  font-size: 0.72rem;
}
.message p {
  margin: 0;
  color: var(--text);
  white-space: pre-wrap;
}
@media (max-width: 640px) {
  .message header, .composer-actions { flex-direction: column; align-items: flex-start; }
}
</style>
