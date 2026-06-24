# Онбординг / первый запуск

Проект на старте: инфраструктура готова, сайт ещё не сгенерирован.

## Что уже сделано (инфраструктура)

- Домен `obninskstation.ru` (+`www`) → VDS 138.16.184.155 (Ubuntu 26.04).
- SSH-доступ: `ssh obninskstation` (root, ключ `~/.ssh/obninskstation`).
- nginx отдаёт статику из `/var/www/obninskstation.ru/html` (сейчас текстовая заглушка).
- TLS Let's Encrypt (apex + www), HTTP→HTTPS, авто-продление.

Детали: [deploy.md](deploy.md).

## Следующие шаги (скаффолд сайта)

1. Инициализировать Next.js 14 + TypeScript + TailwindCSS в корне репозитория.
2. `next.config.js`: `output: 'export'`, `images.unoptimized: true`.
3. Алиас `@/` → `src/` в `tsconfig.json`.
4. Сверстать текстовую заглушку (Hero + краткое описание сообщества) — структуру меняем потом.
5. Настроить GitHub Actions деплой (см. [deploy.md](deploy.md)).

Подсмотреть рабочие конфиги можно в соседнем проекте:
`/Users/fomichev.anton5/dev/AIMediator/ai-mediator/landing` (next.config.js, tailwind, src/).
Отличие: у них `output: 'standalone'` (Docker), у нас — `output: 'export'` (статика).

## Локальная разработка (после скаффолда)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # статический экспорт в out/
npm run lint
```

## Перед коммитом

Запусти ревью: `/reviewer` (или Agent tool, `subagent_type: reviewer`).
