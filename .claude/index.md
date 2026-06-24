# obninskstation.ru — Навигация

Сайт проекта-сообщества: афиша, календарь, запись на мероприятия, билеты.
Стек: Next.js 14 (App Router) + TypeScript + TailwindCSS, статический экспорт под nginx.
Статус: **старт проекта** (инфраструктура готова, сайт ещё не сгенерирован).

---

## ⚠️ Критические правила (читать всегда)

1. **Сборка не должна падать**: перед коммитом `npm run build` проходит без ошибок.
   Статический экспорт (`output: 'export'`) → нельзя использовать серверные фичи Next.js
   (Route Handlers, SSR, `next/image` с лоадером по умолчанию без `unoptimized`).
2. **Секреты — не в репозиторий**: ключи/токены только в GitHub Secrets и `.env.local`
   (в `.gitignore`). Никаких `.env` с реальными значениями в гите.
3. **Релиз/деплой — через теги**: версия и `CHANGELOG.md` создаются командой `npm run release`
   (conventional commits → авто-версия). Пуш тега `vX.Y.Z` запускает деплой. **Теги вручную
   не создавать**, не забывать `git push --follow-tags`. Детали: [docs/processes/release.md](docs/processes/release.md).
4. **Контент vs код**: данные афиши/событий держим в `src/content/`, а не хардкодим в JSX —
   это упростит будущий переход на динамику (билеты, запись).
5. **Коммиты**: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`).

---

## Карта задач

| Задача | Что читать |
|--------|-----------|
| Скаффолд / первый запуск | [docs/onboarding.md](docs/onboarding.md) |
| Новая страница/компонент | [docs/conventions.md](docs/conventions.md) |
| Релиз / версия / changelog | [docs/processes/release.md](docs/processes/release.md) |
| Деплой / сервер / nginx / TLS | [docs/deploy.md](docs/deploy.md) |
| Ревью перед коммитом | [agents/reviewer.md](agents/reviewer.md) |

---

## Быстрые команды

```bash
npm run dev        # локальная разработка
npm run build      # статический экспорт в out/
npm run lint       # линтер
npm run release    # релиз: версия + CHANGELOG + тег (потом git push --follow-tags)
/reviewer          # код-ревью текущих изменений
```

---

## Карта документации

```
.claude/
├── index.md                 # этот файл
├── agents/
│   ├── reviewer.md           # код-ревьюер (чеклист P0→P3)
│   └── reviewer/
│       ├── checklist.md      # детальный чеклист проверок
│       └── architecture.md   # правила структуры Next.js-проекта
├── commands/
│   └── reviewer.md           # вызов /reviewer
└── docs/
    ├── onboarding.md         # быстрый старт для разработчика
    ├── conventions.md        # конвенции: структура, компоненты, коммиты
    ├── deploy.md             # сервер, nginx, TLS, GitHub Actions
    └── processes/
        └── release.md        # версионирование, changelog, теги, деплой
```
