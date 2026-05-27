import usersSeed from '../data/users.json'

const USERS_STORAGE_KEY = 'helldivers_mock_users'

function loadSavedUsers() {
  try {
    const saved = localStorage.getItem(USERS_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveUsers() {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersStore))
  } catch {
    // Если localStorage недоступен, демо продолжит работать только в памяти.
  }
}

function mergeUsers(seedUsers, savedUsers) {
  const merged = [...seedUsers]

  for (const savedUser of savedUsers) {
    const exists = merged.some(
      (user) => user.email.toLowerCase() === savedUser.email.toLowerCase()
    )

    if (!exists) merged.push(savedUser)
  }

  return merged
}

const usersStore = mergeUsers(usersSeed, loadSavedUsers())
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
  saveUsers()

  const { password: _pw, ...safe } = newUser
  return { ok: true, user: safe }
}

export async function listUsers() {
  await delay(120)
  return usersStore.map(({ password: _pw, ...u }) => u)
}
