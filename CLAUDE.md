# obninskstation.ru

Сайт проекта-сообщества в Обнинске: афиша мероприятий, календарь, запись на события и
покупка билетов. Сейчас — **этап старта**: разворачиваем статичный сайт-заглушку,
структуру и функционал будем наращивать позже.

> Подробная навигация для работы с проектом: [`.claude/index.md`](.claude/index.md)

## Статус

- **Инфраструктура** (сервер, SSH, nginx, TLS) — ✅ готова, см. ниже.
- **Сайт** — 🚧 ещё не сгенерирован. Следующий шаг: скаффолд Next.js + текстовая заглушка.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript + TailwindCSS
- **Сборка**: статический экспорт (`output: 'export'`) — отдаётся nginx как статика
- **Хостинг**: VDS (reg.ru), nginx, TLS Let's Encrypt
- **Деплой**: GitHub Actions → сборка статики → выкатка на сервер по SSH/rsync

Стек выбран единым с лендингом соседнего проекта AIMediator
(`/Users/fomichev.anton5/dev/AIMediator/ai-mediator/landing`) — оттуда можно подсматривать
рабочие конфиги (`next.config.js`, `tailwind.config.ts`, структура `src/`).

## Планируемая структура

```
website/
├── src/
│   ├── app/            # Next.js App Router: страницы, layout, metadata
│   ├── components/     # React-компоненты (ui/, sections/)
│   ├── lib/            # утилиты, хелперы
│   └── content/        # данные афиши/событий (пока статичные)
├── public/             # статические ассеты (картинки, og-image, favicon)
├── .github/workflows/  # deploy.yml — выкатка на сервер
├── next.config.js      # output: 'export'
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── .claude/            # контекст проекта для Claude Code (агенты, docs)
```

## Команды (после скаффолда)

```bash
npm install        # установка зависимостей
npm run dev        # локальная разработка → http://localhost:3000
npm run build      # статический экспорт в out/
npm run lint       # eslint
npm run release    # релиз: авто-версия + CHANGELOG + тег (затем git push --follow-tags)
/reviewer          # код-ревью текущих изменений (агент)
```

## Версионирование и релизы

Conventional commits → `npm run release` вычисляет версию, обновляет `package.json` +
`CHANGELOG.md`, создаёт коммит `chore(release): vX.Y.Z` и тег `vX.Y.Z`. Пуш тега `v*`
триггерит деплой (GitHub Actions → сборка статики → rsync на сервер → GitHub Release).
Подробно: [`.claude/docs/processes/release.md`](.claude/docs/processes/release.md).

## Инфраструктура (готово)

| Параметр | Значение |
|----------|----------|
| Домен | `obninskstation.ru` + `www` (reg.ru, A → 138.16.184.155) |
| Сервер | VDS 138.16.184.155, Ubuntu 26.04 LTS |
| SSH | `ssh obninskstation` (root, ключ `~/.ssh/obninskstation`) |
| Веб-сервер | nginx, корень `/var/www/obninskstation.ru/html` |
| Конфиг nginx | `/etc/nginx/sites-available/obninskstation.ru` |
| TLS | Let's Encrypt (apex + www), авто-продление `certbot.timer`, HTTP→HTTPS 301 |
| Firewall | ufw: OpenSSH + Nginx Full |

Детали и нюансы эксплуатации: [`.claude/docs/deploy.md`](.claude/docs/deploy.md).

## Code Review

Перед коммитом — `reviewer`-агент (чеклист P0→P3): команда `/reviewer` или Agent tool
с `subagent_type: reviewer`. См. [`.claude/agents/reviewer.md`](.claude/agents/reviewer.md).
