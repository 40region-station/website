# Процесс релиза

Версионирование и changelog — на основе **conventional commits**, по аналогии с AIMediator.
Инструмент: [`commit-and-tag-version`](https://github.com/absolute-version/commit-and-tag-version).

## Как это работает

`npm run release` запускает `commit-and-tag-version`, который:
1. Считает conventional commits с момента последнего тега и **вычисляет новую версию**:
   - `feat:` → minor (0.1.0 → 0.2.0)
   - `fix:`, `perf:` → patch (0.1.0 → 0.1.1)
   - `feat!:` / `BREAKING CHANGE:` в теле → major (0.1.0 → 1.0.0)
2. Обновляет версию в `package.json` (+ `package-lock.json`).
3. Дописывает `CHANGELOG.md` (секции из `.versionrc.json`).
4. Создаёт коммит `chore(release): vX.Y.Z`.
5. Создаёт git-тег `vX.Y.Z`.

После этого нужно **запушить с тегами**. Пуш тега `v*` триггерит деплой
(`.github/workflows/deploy.yml`): сборка статики → rsync на сервер → GitHub Release.

## Шаги

```bash
# 1. Все изменения закоммичены
git status

# 2. Посмотреть, что произойдёт (без изменений)
npm run release:dry

# 3. Создать релиз (версия определяется автоматически)
npm run release

# 4. Запушить ветку и тег
git push --follow-tags origin main
```

Принудительная версия, если нужно:
```bash
npm run release:patch   # X.Y.Z → X.Y.(Z+1)
npm run release:minor   # X.Y.Z → X.(Y+1).0
npm run release:major   # X.Y.Z → (X+1).0.0
```

## Частые ошибки

- **Не создавать теги вручную** (`git tag vX.Y.Z`) — сломает авто-версионирование.
- **Не забывать** `--follow-tags` при пуше — иначе тег не уедет и деплой не стартует.
- **Не амендить** релизный коммит после пуша.
- Коммиты без conventional-формата **не попадут** в CHANGELOG и не повлияют на версию.

## Коммит-конвенция

```
feat:     новая фича          → minor
fix:      исправление бага     → patch
perf:     производительность   → patch
refactor: рефакторинг
docs:     документация
style:    форматирование
test:     тесты
chore:    вспомогательное (в changelog не попадает)
ci:       изменения CI
```

Breaking change:
```
feat!: переписать структуру афиши

BREAKING CHANGE: формат данных событий изменён
```

## Что нужно настроить один раз (деплой)

1. Создать GitHub-репозиторий, добавить в `package.json` поле `repository` (для ссылок в changelog).
2. Сгенерировать отдельный **deploy-ключ** (`ssh-keygen`), его публичную часть добавить в
   `/root/.ssh/authorized_keys` на сервере.
3. Приватную часть положить в GitHub Secrets как `DEPLOY_SSH_KEY`.
