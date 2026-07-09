import type { MetadataRoute } from "next";

/**
 * sitemap.xml (корень сборки → out/sitemap.xml).
 *
 * Общий docroot apex и поддомена: единый sitemap перечисляет обе точки —
 * заглушку основного сайта и лендинг фестиваля на поддомене. Кросс-хост
 * URL в одном sitemap допустимы, когда домены под одним владельцем и файл
 * заявлен в robots.txt того же хоста (см. `robots.ts`).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://obninskstation.ru/",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://amo.obninskstation.ru/",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
