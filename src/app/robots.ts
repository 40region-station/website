import type { MetadataRoute } from "next";

/**
 * robots.txt (корень сборки → out/robots.txt).
 *
 * Нюанс инфраструктуры: apex `obninskstation.ru` и поддомен
 * `amo.obninskstation.ru` делят один docroot, поэтому этот файл физически
 * раздаётся на обоих доменах. Разрешаем обход везде и указываем единый
 * sitemap, который перечисляет URL обоих хостов (см. `sitemap.ts`).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://obninskstation.ru/sitemap.xml",
  };
}
