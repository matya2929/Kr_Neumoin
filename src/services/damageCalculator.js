export const ARMOR_LEVELS = [
  { value: 1, label: 'Лёгкая' },
  { value: 2, label: 'Средняя' },
  { value: 3, label: 'Тяжёлая' },
  { value: 4, label: 'Танковая' }
]

function toNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

export function calculateDamage(weapon, enemy) {
  if (!weapon || !enemy) return null

  const ap = toNumber(weapon.armorPenetrationLevel)
  const armor = toNumber(enemy.armorLevel)
  const damage = toNumber(weapon.damage)
  const durableDamage = toNumber(weapon.durableDamage)
  const durabilityPercent = toNumber(enemy.durabilityPercent, 0)

  if (ap < armor) {
    return {
      verdict: 'ricochet',
      title: 'Рикошет, нет урона',
      value: 0,
      details: `Бронепробитие оружия (AP=${ap}) ниже уровня брони цели (${armor}). Снаряд рикошетит, урон не наносится.`
    }
  }

  if (ap > armor) {
    return {
      verdict: 'full',
      title: 'Базовый урон без штрафов',
      value: damage,
      details: `Броня цели (${armor}) ниже бронепробития оружия (AP=${ap}). Проходит только базовый урон оружия без штрафов: ${damage}.`
    }
  }

  const durabilityDamage = damage * durabilityPercent
  const totalBeforePenalty = durabilityDamage + durableDamage
  const totalAfterPenalty = totalBeforePenalty * 0.6
  const roundedTotal = Math.round(totalAfterPenalty * 100) / 100

  return {
    verdict: 'partial',
    title: 'Урон со штрафом брони',
    value: roundedTotal,
    details: `AP оружия (${ap}) совпадает с бронёй цели (${armor}). Расчёт: (${damage} × ${Math.round(durabilityPercent * 100)}% + ${durableDamage}) × 60% = ${roundedTotal}.`
  }
}
