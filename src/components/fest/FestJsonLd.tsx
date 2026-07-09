import { fest } from "@/content/fest";

/**
 * Разметка Schema.org для лендинга фестиваля АМО — тип `MusicEvent` (JSON-LD).
 *
 * Даёт поисковикам структурированные данные события: название, дату, площадку,
 * билеты, лайнап, организатора. Google/Яндекс на её основе рисуют карточку
 * события в выдаче (дата, место, ссылка «купить билеты»).
 *
 * Серверный компонент: рендерит `<script type="application/ld+json">` в HTML,
 * который уходит в статический экспорт как есть (без JS на клиенте).
 * Опциональные поля (время, цена, адрес улицы) добавляются только когда
 * заданы в `fest.seo` — Google допускает их отсутствие, но с ними карточка
 * полнее. См. TODO в `src/content/fest.ts`.
 */
export function FestJsonLd() {
  const s = fest.seo;

  // Дата: date-only, либо полный ISO с временем, если оно известно.
  const startDate = s.startTime ? `${s.startDate}T${s.startTime}` : s.startDate;
  // endDate имеет смысл только с точным временем (однодневный фестиваль).
  const endDate =
    s.startTime && s.endTime ? `${s.startDate}T${s.endTime}` : null;

  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: s.addressLocality,
    addressRegion: s.addressRegion,
    addressCountry: s.addressCountry,
  };
  if (s.streetAddress) address.streetAddress = s.streetAddress;

  const offers: Record<string, unknown> = {
    "@type": "Offer",
    url: fest.ticketUrl,
    availability: "https://schema.org/InStock",
    validFrom: s.startDate,
  };
  if (s.ticketPrice) {
    offers.price = s.ticketPrice;
    offers.priceCurrency = s.priceCurrency;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: s.eventName,
    description: fest.about.text,
    startDate,
    ...(endDate ? { endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [s.imageUrl],
    url: "https://amo.obninskstation.ru/",
    location: {
      "@type": "Place",
      name: s.venueName,
      address,
    },
    organizer: {
      "@type": "Organization",
      name: s.organizerName,
      url: s.organizerUrl,
    },
    performer: fest.lineup.acts.map((name) => ({
      "@type": "MusicGroup",
      name,
    })),
    offers,
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify экранирует контент; для JSON-LD этого достаточно.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
