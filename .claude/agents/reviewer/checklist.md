# Code Review Checklist

Проект: Next.js 14 (App Router), TypeScript, TailwindCSS, **статический экспорт**
(`output: 'export'`), отдаётся nginx.

## P0 — Критические (падение сборки / битый деплой / утечка секретов)

### Сборка / статический экспорт

- [ ] Нет серверных фич Next.js, несовместимых со статическим экспортом
  - Запрещено: Route Handlers (`app/**/route.ts`), Server Actions, `dynamic = 'force-dynamic'`,
    middleware с рантайм-логикой, `cookies()`/`headers()` из `next/headers`.
  - Grep: `grep -rn "route.ts\|use server\|force-dynamic\|next/headers" src/`
- [ ] `next/image` работает в экспорте: либо `images.unoptimized: true` в next.config,
    либо кастомный лоадер
  - Grep: `grep -n "unoptimized\|loader" next.config.js`
- [ ] Динамические роуты имеют `generateStaticParams()` (иначе экспорт упадёт)
  - Grep: `grep -rln "\[.*\]" src/app` → проверить наличие `generateStaticParams`
- [ ] Нет рантайм-`fetch` к данным, которых нет на этапе сборки (в статике их некому отдать)
- [ ] Импорты резолвятся, нет битых путей/алиасов (`@/...`)

### Секреты

- [ ] Нет секретов/токенов/паролей в коде и конфигах
  - Grep: `grep -rniE "(secret|token|password|api[_-]?key|privkey)" src/ *.js *.ts *.json --include=*.ts --include=*.tsx --include=*.js`
- [ ] `.env*` с реальными значениями не закоммичены (только `.env.example`)
  - Проверить: `git diff --cached --name-only | grep -E "\.env"` и что они в `.gitignore`
- [ ] Клиентские переменные только с префиксом `NEXT_PUBLIC_` и без чувствительных данных

### Деплой

- [ ] Изменения в `.github/workflows/deploy.yml` не ломают пайплайн
    (корректные пути артефактов, путь выкатки `/var/www/obninskstation.ru/html`)
- [ ] Деплоится содержимое `out/` (результат `next build` с экспортом), а не `.next/`

## P1 — Качество / производительность / доступность / SEO

### Производительность

- [ ] Изображения оптимизированы (webp/avif, разумный размер), нет гигантских PNG в `public/`
- [ ] Тяжёлые клиентские компоненты не тянутся без необходимости
  - `'use client'` только там, где нужна интерактивность; статичные секции — серверные компоненты
  - Grep: `grep -rn "use client" src/`

### Доступность (a11y)

- [ ] У `<img>` есть `alt`; у интерактивных элементов — доступные имена
  - Grep: `grep -rn "<img\|<Image" src/` → проверить `alt`
- [ ] Семантические теги (`<header>`, `<main>`, `<nav>`, `<footer>`), а не `<div>` повсюду
- [ ] Достаточный контраст и фокус-стейты у кликабельных элементов

### SEO / метаданные

- [ ] У страниц есть `metadata` (title, description), у сайта — og-image
  - Grep: `grep -rn "export const metadata\|generateMetadata" src/app/`
- [ ] Есть `lang="ru"` в корневом layout

### Адаптивность

- [ ] Вёрстка адаптивна (Tailwind-брейкпоинты `sm:`/`md:`/`lg:`), нет фиксированных ширин,
    ломающих мобайл

## P2 — Структура (читай architecture.md)

- [ ] Данные афиши/событий в `src/content/`, не хардкодятся в JSX
- [ ] Компоненты разложены: переиспользуемый UI → `components/ui/`, секции страниц →
    `components/sections/`
- [ ] Нет дублирования: повторяющаяся разметка вынесена в компонент
- [ ] TypeScript: нет `any` без причины, у пропсов есть типы/интерфейсы
  - Grep: `grep -rn ": any\|as any" src/`
- [ ] Утилиты/хелперы в `src/lib/`, а не разбросаны по компонентам

## P3 — Стиль

### Коммиты

- [ ] Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `style:`, `docs:`
  - Проверить: `git log --oneline -10`

### Код

- [ ] Нет закомментированного/мёртвого кода и `console.log` в продакшене
  - Grep: `grep -rn "console\.\(log\|debug\)\|^[[:space:]]*//.*<" src/`
- [ ] Нет TODO без контекста
  - Grep: `grep -rn "TODO\|FIXME\|HACK" src/`
- [ ] Именование: компоненты PascalCase, переменные/функции camelCase, файлы согласованы
- [ ] Tailwind-классы без явных конфликтов; общие комбинации вынесены/упорядочены
