import messagesSeed from '../data/messages.json'

const messagesStore = [...messagesSeed]
let nextId = messagesStore.reduce((m, msg) => Math.max(m, msg.id), 0) + 1

const delay = (ms = 160) => new Promise((r) => setTimeout(r, ms))

export async function listMessages() {
  await delay()
  return [...messagesStore].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export async function sendMessage({ user, text }) {
  await delay()
  if (!user) {
    return { ok: false, error: 'Для передачи сообщения нужно войти в систему.' }
  }
  const cleanText = String(text || '').trim()
  if (!cleanText) {
    return { ok: false, error: 'Сообщение не может быть пустым.' }
  }
  if (cleanText.length > 600) {
    return { ok: false, error: 'Сообщение слишком длинное. Максимум 600 символов.' }
  }

  const message = {
    id: nextId++,
    nickname: user.nickname,
    rank: user.rank || 'Адский Десантник',
    text: cleanText,
    createdAt: new Date().toISOString()
  }
  messagesStore.push(message)
  return { ok: true, message }
}
