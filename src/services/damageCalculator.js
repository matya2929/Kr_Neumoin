/**
 * Калькулятор урона Helldivers 2.
 * Уровни брони: 1=Лёгкая, 2=Средняя, 3=Тяжёлая, 4=Танковая.
 *
 * Правила:
 *  - AP < armor → рикошет, нет урона
 *  - AP = armor → (durableDamage + damage * enemy.durabilityPercent) * 0.6
 *  - AP > armor → damage * enemy.durabilityPercent без штрафа брони
 *
 * Прочностной урон учитывается только при совпадении AP и брони.
 */
export const ARMOR_LEVELS = [
  { value: 1, label: 'Лёгкая' },
  { value: 2, label: 'Средняя' },
  { value: 3, label: 'Тяжёлая' },
  { value: 4, label: 'Танковая' }
]

export function calculateDamage(weapon, enemy) {
  if (!weapon || !enemy) return null

  const ap = Number(weapon.armorPenetrationLevel)
  const armor = Number(enemy.armorLevel)
  const damage = Number(weapon.damage)
  const durableDamage = Number(weapon.durableDamage)
  const durabilityPercent = Number(enemy.durabilityPercent ?? 0.2)
  const regularDurabilityDamage = damage * durabilityPercent

  if (ap < armor) {
    return {
      verdict: 'ricochet',
      title: 'Рикошет, нет урона',
      value: 0,
      details: `Бронепробитие оружия (AP=${ap}) ниже уровня брони цели (${armor}). Снаряд отскакивает, итоговый урон равен 0.`
    }
  }
  if (ap === armor) {
    const baseDamage = durableDamage + regularDurabilityDamage
    const total = baseDamage * 0.6
    return {
      verdict: 'partial',
      title: 'Урон со штрафом брони',
      value: Math.round(total * 100) / 100,
      details: `AP равен броне цели, поэтому учитывается прочностной урон. Расчёт: (${durableDamage} + ${damage} × ${Math.round(durabilityPercent * 100)}%) × 60% = ${Math.round(total * 100) / 100}.`
    }
  }
  return {
    verdict: 'full',
    title: 'Урон без штрафа брони',
    value: Math.round(regularDurabilityDamage * 100) / 100,
    details: `AP оружия (${ap}) выше брони цели (${armor}), штрафа по броне нет. Прочностной урон не добавляется: ${damage} × ${Math.round(durabilityPercent * 100)}% = ${Math.round(regularDurabilityDamage * 100) / 100}.`
  }
}
