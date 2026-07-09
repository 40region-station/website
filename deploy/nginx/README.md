# nginx-конфиги (снимок прода)

Версионированные копии server-блоков nginx с боевого сервера
(VDS `138.16.184.155`, `ssh obninskstation`). Это **снимок**, а не источник, из
которого что-то авто-разворачивается — правки на сервере делаются вручную, а сюда
периодически синхронизируются для истории/восстановления.

| Файл | На сервере | Назначение |
|------|-----------|------------|
| `obninskstation.ru.conf` | `/etc/nginx/sites-available/obninskstation.ru` | Основной сайт: главная `/` → 302 на поддомен (пока сайт-заглушка), `/fest` → 301 на поддомен |
| `amo.obninskstation.ru.conf` | `/etc/nginx/sites-available/amo.obninskstation.ru` | Лендинг фестиваля АМО на поддомене (общий docroot, `/` → `/fest/index.html`) |

## Что тут ручное, а что от certbot

- **Ручные (смысловые) части:**
  - в `amo.*` — блок с `root /var/www/obninskstation.ru/html` и
    `location = / { try_files /fest/index.html =404; }` (общий docroot с основным сайтом);
  - в `obninskstation.ru.conf` — `location = /` → 302 на поддомен (временный, пока
    основной сайт — заглушка) и `location = /fest` / `= /fest/` → 301 на поддомен.
- **Строки `# managed by Certbot`** (443-блоки, пути к сертификатам, HTTP→HTTPS
  редиректы) добавляет и обслуживает `certbot --nginx` автоматически. Руками их не
  трогаем — при необходимости перевыпускаем сертификат.

## Как применить на новом/чистом сервере

```bash
# 1. Положить конфиги
scp deploy/nginx/obninskstation.ru.conf     obninskstation:/etc/nginx/sites-available/obninskstation.ru
scp deploy/nginx/amo.obninskstation.ru.conf obninskstation:/etc/nginx/sites-available/amo.obninskstation.ru

# 2. Включить и проверить
ssh obninskstation 'ln -sf /etc/nginx/sites-available/{obninskstation.ru,amo.obninskstation.ru} /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx'

# 3. TLS (если сертификатов ещё нет — иначе строки Certbot уже в конфигах)
ssh obninskstation 'certbot --nginx -d obninskstation.ru -d www.obninskstation.ru -n --redirect'
ssh obninskstation 'certbot --nginx -d amo.obninskstation.ru -n --redirect'
```

> Предусловия: DNS `obninskstation.ru`, `www`, `amo` → IP сервера; сборка выкачена в
> `/var/www/obninskstation.ru/html` (включая `fest/`). Подробности — в
> [`.claude/docs/deploy.md`](../../.claude/docs/deploy.md).

## Синхронизация снимка

После изменений nginx на сервере обновить копии:

```bash
ssh obninskstation 'cat /etc/nginx/sites-available/obninskstation.ru'     > deploy/nginx/obninskstation.ru.conf
ssh obninskstation 'cat /etc/nginx/sites-available/amo.obninskstation.ru' > deploy/nginx/amo.obninskstation.ru.conf
```
