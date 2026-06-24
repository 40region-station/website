# Деплой, сервер, nginx, TLS

## Сервер

| Параметр | Значение |
|----------|----------|
| IP | 138.16.184.155 |
| ОС | Ubuntu 26.04 LTS, x86_64 |
| SSH | `ssh obninskstation` (alias в `~/.ssh/config`), user `root`, ключ `~/.ssh/obninskstation` (ed25519) |
| Веб-сервер | nginx |
| Корень сайта | `/var/www/obninskstation.ru/html` |
| Конфиг nginx | `/etc/nginx/sites-available/obninskstation.ru` (симлинк в `sites-enabled`) |
| Firewall | ufw: OpenSSH + Nginx Full |

> ⚠️ Долгие SSH-команды могут рваться: при обновлениях `needrestart`/`certbot` перезапускают
> системные сервисы и закрывают сессию. Тяжёлые операции запускай через `nohup … &` и
> опрашивай лог, а не в одной foreground-сессии.

## TLS (Let's Encrypt)

- Сертификат на `obninskstation.ru` + `www.obninskstation.ru` (ECDSA), выпущен certbot
  (`certbot --nginx`). HTTP→HTTPS 301-редирект включён.
- Авто-продление: systemd-таймер `certbot.timer` (активен). Проверка: `certbot renew --dry-run`.
- Файлы: `/etc/letsencrypt/live/obninskstation.ru/`.

## DNS (reg.ru)

A-записи `@` и `www` → 138.16.184.155, nameservers `ns1/ns2.reg.ru`.

> Локальная сеть разработчика перехватывает DNS и возвращает `198.18.x.x` — проверять
> резолв нужно **с сервера** (`ssh obninskstation 'dig +short obninskstation.ru'`) или
> напрямую у `@ns1.reg.ru`, а не с macOS.

## Деплой через GitHub Actions (план)

При push в `main`:

1. `npm ci && npm run build` → статика в `out/`.
2. Выкатка `out/` на сервер в `/var/www/obninskstation.ru/html` (rsync по SSH).
3. (nginx перезагрузка не нужна — отдаётся статика; reload только при смене конфига.)

Что потребуется настроить:
- **GitHub Secrets**: приватный SSH-ключ для деплоя (отдельный deploy-ключ, не личный),
  host `138.16.184.155`, user `root`, путь.
- На сервере: добавить публичный deploy-ключ в `/root/.ssh/authorized_keys`.

Подсмотреть рабочий пайплайн: `/Users/fomichev.anton5/dev/AIMediator/ai-mediator/.github/workflows/deploy.yml`
(у них Docker-деплой; нам нужен более простой rsync статики).

## Ручная выкатка (отладочная, разово)

```bash
npm run build
rsync -avz --delete out/ obninskstation:/var/www/obninskstation.ru/html/
```
