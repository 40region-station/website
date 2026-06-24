# Конвенции

## Структура (кратко)

Полные правила: [../agents/reviewer/architecture.md](../agents/reviewer/architecture.md).

- `src/app/` — роуты App Router (page.tsx, layout.tsx, metadata).
- `src/components/ui/` — переиспользуемые примитивы; `src/components/sections/` — секции страниц.
- `src/lib/` — утилиты (`cn()`, форматирование), типы.
- `src/content/` — данные афиши/событий (отдельно от разметки).
- `public/` — статические ассеты.

## Компоненты

- По умолчанию серверные; `'use client'` — только для интерактивных.
- Один компонент — одна ответственность; повторы выносим в `ui/`.
- Пропсы типизированы (interface/type), без `any`.

## Стиль кода

- TypeScript strict, алиас `@/` → `src/`.
- TailwindCSS, mobile-first, хелпер `cn()` для условных классов.
- Именование: компоненты `PascalCase`, переменные/функции `camelCase`.
- Без `console.log`, мёртвого и закомментированного кода в коммитах.

## Git

- **Conventional commits**: `feat:`, `fix:`, `chore:`, `refactor:`, `style:`, `docs:`, `ci:`.
- Перед коммитом — `/reviewer` (чеклист P0→P3).
- Деплой только из `main` через GitHub Actions.

## Контент на русском

Тексты сайта и интерфейс — на русском (аудитория — сообщество в Обнинске).
`<html lang="ru">` в корневом layout.
