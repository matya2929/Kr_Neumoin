# Helldivers 2 — Демократический Информационный Центр

Демонстрационный сайт по игре **Helldivers 2** на **Vue 3 + JavaScript** (без TypeScript), полностью на русском языке. Полностью статичная сборка, готовая к публикации на CodeSandbox / GitHub Pages / S3.

## Запуск

```bash
npm install
npm run dev      # dev-сервер Vite (http://localhost:5173)
npm run build    # production-сборка в dist/
npm run preview  # локальный просмотр готовой сборки
```

## Структура

```
helldivers2-vue/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── router.js
│   ├── components/        # AppHeader, SidebarMenu, FooterSection, AuthModal,
│   │                      # AccordionSection, ItemCard, EnemyCard, SearchSelect
│   ├── views/             # MainPage, ArsenalPage, EnemiesPage, DamageCalculatorPage
│   ├── services/          # api.js (фасад), damageCalculator.js
│   ├── data/              # клиентские пресеты UI
│   └── assets/            # icons, factions, ui, styles.css
└── backend/               # mock backend (без БД, async-функции над JSON)
    ├── data/              # users.json, weapons.json, armor.json,
    │                      # grenades.json, enemies.json
    └── services/          # authService.js, dataService.js
```

## Архитектура

- **Frontend** в `src/` — Vue 3 + Vue Router (hash mode), pure JavaScript.
- **Mock backend** в `backend/` — асинхронные функции, имитирующие сетевые
  запросы; данные загружаются из локальных JSON-файлов.
- `src/services/api.js` — фасад, проксирующий вызовы в backend. Чтобы
  подключить настоящий бэкенд, достаточно заменить импорты на `fetch`.

## Данные и атрибуция

Все названия снаряжения, врагов, описания и URL изображений взяты из
**[Helldivers Wiki / Fandom](https://helldivers.fandom.com)**. В каждом
JSON-файле присутствуют поля `source` и `sourceUrl`. Карточки в UI содержат
ссылку «↗ Helldivers Wiki» на источник.

Иконки фракций (Терминиды, Автоматоны, Просветлённые) и флаг Супер-Земли
извлечены из пользовательского файла `Стили и иконки.docx` и помещены в
`src/assets/factions/` и `src/assets/ui/`.

> Если внешние изображения с wiki-CDN недоступны (CORS / hotlinking),
> карточка отображает плейсхолдер «NO IMAGE» с подсказкой «замените локально
> в src/assets». Замена тривиальна: положите PNG/SVG в каталог `src/assets`
> и измените поле `image` в соответствующем JSON на относительный путь
> (или используйте `import imgUrl from '@/assets/...'` в коде).

## Калькулятор урона

Формула Helldivers 2:

- AP < броня → **Рикошет, нет урона**
- AP = броня → `total = durableDamage + damage × durabilityPercent`
- AP > броня → **полный урон оружия**

Логика инкапсулирована в `src/services/damageCalculator.js` и переиспользуется
страницей расчёта.

## Авторизация (демо)

Регистрация и вход реализованы через mock `backend/services/authService.js`.
Хранилище — массив в памяти, инициализированный из `backend/data/users.json`.

**Тест-десантник:** `democracy@super-earth.gov` / `freedom2184`

## Авторство

- Права: **Неумоин Матвей Александрович**
- Партнёрство: Telegram **[@matya2929](https://t.me/matya2929)**
- Почта: **matveneumoin@gmail.com**

Источник данных: [Helldivers Wiki / Fandom](https://helldivers.fandom.com).
