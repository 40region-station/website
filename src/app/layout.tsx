import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://obninskstation.ru"),
  title: "obninskstation — сообщество в Обнинске",
  description:
    "Проект-сообщество в Обнинске: афиша мероприятий, календарь событий, запись и билеты. Скоро открытие.",
  openGraph: {
    title: "obninskstation — сообщество в Обнинске",
    description:
      "Афиша мероприятий, календарь событий, запись и билеты. Скоро открытие.",
    url: "https://obninskstation.ru",
    siteName: "obninskstation",
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
