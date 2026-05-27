/**
 * Frontend service layer.
 * Перенаправляет вызовы во внутренний mock backend.
 * При реальном бэкенде здесь будет fetch/axios — UI трогать не придётся.
 */
export {
  login,
  register,
  listUsers
} from '@backend/services/authService.js'

export {
  getArmor,
  getWeapons,
  getGrenades,
  getEnemies,
  getAllWeaponsFlat,
  getAllEnemiesFlat
} from '@backend/services/dataService.js'

export {
  listMessages,
  sendMessage
} from '@backend/services/communicationService.js'
