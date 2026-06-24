import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://obninskstation.ru"),
  title: "Станция Обнинск",
  description:
    "Проект-сообщество в Обнинске: афиша мероприятий, календарь событий, запись и билеты. Скоро открытие.",
  openGraph: {
    title: "Станция Обнинск",
    description:
      "Афиша мероприятий, календарь событий, запись и билеты. Скоро открытие.",
    url: "https://obninskstation.ru",
    siteName: "Станция Обнинск",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
