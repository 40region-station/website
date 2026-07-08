import type { Metadata } from "next";
import { Unbounded } from "next/font/google";

/**
 * Дисплейный шрифт лендинга.
 * ВРЕМЕННО: Unbounded (Google, кириллица) — близкий по духу плейсхолдер.
 * TODO: заменить на оригинальный шрифт макета — положить файлы в
 * `public/fest/fonts/`, объявить @font-face и выставить `--font-display`.
 */
const display = Unbounded({
  subsets: ["cyrillic", "latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "АМО — фестиваль в Обнинске · 1 августа",
  description:
    "AM-0 — фестиваль любви к городу, людям и культуре в Обнинске. Лайвы и dj-сеты 20+ музыкантов, лекции, воркшопы, кинопоказ. 1 августа, дворик ДК ФЭИ. Билеты онлайн.",
  openGraph: {
    title: "АМО — фестиваль в Обнинске · 1 августа",
    description:
      "Фестиваль любви к городу, людям и культуре. Лайвы и dj-сеты 20+ музыкантов, лекции, воркшопы, кинопоказ. 1 августа, дворик ДК ФЭИ.",
    url: "https://obninskstation.ru/fest",
    siteName: "Станция Обнинск",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/fest/og.png",
        width: 1200,
        height: 675,
        alt: "АМО — фестиваль в Обнинске",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "АМО — фестиваль в Обнинске · 1 августа",
    description:
      "Фестиваль любви к городу, людям и культуре. Лайвы и dj-сеты 20+ музыкантов, лекции, воркшопы, кинопоказ. 1 августа, дворик ДК ФЭИ.",
    images: ["/fest/og.png"],
  },
};

export default function FestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={display.variable}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </div>
  );
}
