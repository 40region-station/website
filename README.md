# Станция Обнинск — obninskstation.ru

Сайт проекта-сообщества в Обнинске: афиша мероприятий, календарь, запись на события и
покупка билетов. Сейчас — статичный сайт-заглушка, функционал наращиваем поэтапно.

**Стек:** Next.js 14 (App Router) + TypeScript + TailwindCSS, статический экспорт
(`output: 'export'`), отдаётся nginx. Деплой — GitHub Actions по тегу версии.

## Разработка

```bash
npm install        # зависимости
npm run dev        # локально → http://localhost:3000
npm run build      # статический экспорт в out/
npm run lint       # eslint
```

## Релизы и версионирование

Версия определяется автоматически по [conventional commits](https://www.conventionalcommits.org/):

| Префикс коммита | Эффект на версию |
|-----------------|------------------|
| `feat:` | minor (0.1.0 → 0.2.0) |
| `fix:`, `perf:` | patch (0.1.0 → 0.1.1) |
| `feat!:` / `BREAKING CHANGE:` в теле | major (0.1.0 → 1.0.0) |
| `chore:`, `docs:`, `style:`, `refactor:`, `test:`, `ci:` | версию не меняют |

### Как выпустить релиз

```bash
# 1. Убедиться, что всё закоммичено
git status

# 2. (опц.) посмотреть, что произойдёт, без изменений
npm run release:dry

# 3. Создать релиз: бамп версии в package.json, обновление CHANGELOG.md,
#    коммит chore(release): vX.Y.Z и git-тег vX.Y.Z
npm run release

# 4. Запушить ветку и тег — пуш тега запускает авто-деплой на obninskstation.ru
git push --follow-tags origin main
```

Принудительная версия, если нужно:

```bash
npm run release:patch   # X.Y.Z → X.Y.(Z+1)
npm run release:minor   # X.Y.Z → X.(Y+1).0
npm run release:major   # X.Y.Z → (X+1).0.0
```

> ⚠️ Теги вручную (`git tag vX.Y.Z`) **не создавать** — сломает авто-версионирование.
> Не забывать `--follow-tags` при пуше, иначе тег не уедет и деплой не стартует.

## Деплой

Пуш тега `v*` запускает GitHub Actions (`.github/workflows/deploy.yml`):
сборка статики → `rsync` на сервер `/var/www/obninskstation.ru/html` → создание GitHub Release.
Обычный пуш в `main` сайт **не** меняет — деплой только по тегу.

## Документация для разработки

Контекст проекта и процессы — в [`.claude/`](.claude/index.md):
- [`.claude/docs/processes/release.md`](.claude/docs/processes/release.md) — релизы (подробно)
- [`.claude/docs/deploy.md`](.claude/docs/deploy.md) — сервер, nginx, TLS, CI
- [`.claude/docs/conventions.md`](.claude/docs/conventions.md) — структура и конвенции
- [`.claude/agents/reviewer.md`](.claude/agents/reviewer.md) — код-ревьюер (`/reviewer`)
