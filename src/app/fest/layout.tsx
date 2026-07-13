import type { Metadata } from "next";
import { Inter } from "next/font/google";

/**
 * Дисплейный шрифт лендинга — Inter Semi Bold (600).
 * В макете весь текст набран Inter Semi Bold с трекингом −0.03em; кегли и
 * line-height проставлены поэлементно на странице (заголовки — 0.98, текст — 1.1).
 */
const display = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  // Лендинг живёт на отдельном поддомене amo.obninskstation.ru (nginx отдаёт
  // /fest/index.html в корне поддомена). metadataBase переопределяет корневой,
  // чтобы относительные OG-URL резолвились на поддомен, а не на apex.
  metadataBase: new URL("https://amo.obninskstation.ru"),
  title: "АМО — фестиваль в Обнинске · 1 августа",
  description:
    "AM-0 — фестиваль любви к городу, людям и культуре в Обнинске. Лайвы и dj-сеты 20+ музыкантов, лекции, воркшопы, кинопоказ. 1 августа, дворик ДК ФЭИ. Билеты онлайн.",
  keywords: [
    "АМО",
    "AM-0",
    "фестиваль Обнинск",
    "фестиваль в Обнинске",
    "афиша Обнинск",
    "музыкальный фестиваль Обнинск",
    "события Обнинск",
    "концерт Обнинск",
    "ДК ФЭИ",
    "Станция Обнинск",
    "1 августа",
  ],
  alternates: {
    canonical: "https://amo.obninskstation.ru",
  },
  openGraph: {
    title: "АМО — фестиваль в Обнинске · 1 августа",
    description:
      "Фестиваль любви к городу, людям и культуре. Лайвы и dj-сеты 20+ музыкантов, лекции, воркшопы, кинопоказ. 1 августа, дворик ДК ФЭИ.",
    url: "https://amo.obninskstation.ru",
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
      <link rel='preconnect' href='https://events.nethouse.ru' />
      <link rel='dns-prefetch' href='https://events.nethouse.ru' />
      {/*
        Даём попап-форме Nethouse приоритет над счётчиками (Метрика грузит свой
        tag.js afterInteractive): начинаем качать popup-form.js ещё при разборе
        HTML, так что к моменту вставки <script> в useEffect он уже в кэше и форма
        прогревается раньше. Без crossOrigin — чтобы preload совпал с обычным
        <script src> и браузер не качал файл дважды.
      */}
      <link
        rel='preload'
        as='script'
        href='https://events.nethouse.ru/assets/js/popup-form.js'
      />
      {children}
    </div>
  );
}
