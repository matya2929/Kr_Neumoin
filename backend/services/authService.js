/**
 * Mock backend: сервис аутентификации.
 * Имитирует асинхронные запросы к серверу (без реальной БД).
 * Хранилище — массив в памяти, инициализированный из users.json.
 */
import usersSeed from '../data/users.json'

const usersStore = [...usersSeed]
let nextId = usersStore.reduce((m, u) => Math.max(m, u.id), 0) + 1

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms))

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function login({ email, password }) {
  await delay()
  if (!email || !password) {
    return { ok: false, error: 'Заполните email и пароль.' }
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: 'Некорректный email.' }
  }
  const user = usersStore.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  if (!user) {
    return { ok: false, error: 'Неверный email или пароль.' }
  }
  const { password: _pw, ...safe } = user
  return { ok: true, user: safe }
}

export async function register({ nickname, rank, level, email, password }) {
  await delay()
  if (!nickname || !nickname.trim()) {
    return { ok: false, error: 'Никнейм обязателен.' }
  }
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: 'Некорректный email.' }
  }
  if (!password || password.length < 4) {
    return { ok: false, error: 'Пароль должен быть не короче 4 символов.' }
  }
  if (usersStore.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: 'Десантник с таким email уже зарегистрирован.' }
  }
  if (usersStore.some((u) => u.nickname.toLowerCase() === nickname.toLowerCase())) {
    return { ok: false, error: 'Такой никнейм уже занят.' }
  }
  const newUser = {
    id: nextId++,
    nickname: nickname.trim(),
    rank: rank ? rank.trim() : null,
    level: level ? Number(level) : null,
    email: email.trim(),
    password
  }
  usersStore.push(newUser)
  const { password: _pw, ...safe } = newUser
  return { ok: true, user: safe }
}

export async function listUsers() {
  await delay(120)
  return usersStore.map(({ password: _pw, ...u }) => u)
}
