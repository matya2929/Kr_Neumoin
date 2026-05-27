/**
 * Mock backend: сервис данных арсенала и врагов.
 * Имитирует асинхронные запросы к серверу (без реальной БД).
 */
import armorData from '../data/armor.json'
import weaponsData from '../data/weapons.json'
import grenadesData from '../data/grenades.json'
import enemiesData from '../data/enemies.json'

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms))

export async function getArmor() {
  await delay()
  return armorData
}

export async function getWeapons() {
  await delay()
  return weaponsData
}

export async function getGrenades() {
  await delay()
  return grenadesData
}

export async function getEnemies() {
  await delay()
  return enemiesData
}

export async function getAllWeaponsFlat() {
  await delay()
  const flat = []
  for (const [catKey, cat] of Object.entries(weaponsData.categories)) {
    for (const w of cat.items) {
      flat.push({ ...w, categoryKey: catKey, categoryLabel: cat.label })
    }
  }
  return flat
}

export async function getAllEnemiesFlat() {
  await delay()
  const flat = []
  for (const [factionKey, faction] of Object.entries(enemiesData.factions)) {
    for (const e of faction.enemies) {
      flat.push({
        ...e,
        factionKey,
        factionLabel: faction.label,
        factionIcon: faction.icon
      })
    }
  }
  return flat
}
