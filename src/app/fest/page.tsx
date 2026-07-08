import { fest } from "@/content/fest";
import { preventOrphans } from "@/lib/typography";
import { AmoLogo } from "@/components/fest/AmoLogo";
import { TicketButton } from "@/components/fest/TicketButton";

/** Фирменная «точка» над заголовком секции. */
function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-[10px] w-[10px] rounded-full ${className ?? ""}`}
    />
  );
}

export default function FestPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-[#100030] text-[#FFFFFF]">
      {/*
        Верх страницы. На мобилке визуально переворачиваем порядок
        (flex-col-reverse): сначала логотип «АМО», под ним — кнопка билетов, как
        в Figma. В DOM порядок «навбар → герой» сохраняем ради таб-порядка и
        скринридеров. A11y-нюанс (логотип перед навигацией на мобилке) — открыт,
        обсудить позже, см. заметку в памяти проекта.
      */}
      <div className="flex flex-col-reverse sm:flex-col">
        {/* Навбар. На мобилке боковые ссылки скрыты — как в макете, по центру только билеты. */}
        <header className="mx-auto flex w-full max-w-[1200px] items-center justify-center gap-4 px-4 pt-8 text-[25px] sm:justify-between sm:px-6 sm:pt-10">
          <a
            href={fest.nav[0].href}
            className="hidden shrink-0 transition-opacity hover:opacity-70 sm:block"
          >
            {fest.nav[0].label}
          </a>
          <TicketButton className="shrink-0 bg-[#FF6CF0] px-6 py-2 text-[#100030] transition-transform hover:scale-105">
            {fest.nav[1].label}
          </TicketButton>
          <a
            href={fest.nav[2].href}
            className="hidden shrink-0 transition-opacity hover:opacity-70 sm:block"
          >
            {fest.nav[2].label}
          </a>
        </header>

        {/* Герой. Логотип «АМО» — главный заголовок страницы (h1). */}
        <section className="mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-20">
          <div className="flex aspect-[1200/675] w-full items-center justify-center border border-white/20 px-6 sm:px-12">
            <h1 className="w-full">
              <AmoLogo className="block w-full text-[#FFFFFF]" />
            </h1>
          </div>
        </section>
      </div>

      {/* О фестивале */}
      <section
        id="about"
        className="mx-auto w-full max-w-[1080px] scroll-mt-8 px-6 pt-24 text-center sm:pt-32"
      >
        <div className="flex flex-col items-center gap-4">
          <Dot className="bg-[#FF6CF0]" />
          <h2 className="text-xl text-[#FF6CF0] sm:text-3xl">
            {preventOrphans(fest.about.heading)}
          </h2>
        </div>
        <p className="mx-auto mt-8 max-w-[1013px] text-base leading-relaxed sm:text-lg">
          {/* Название «AM-0» в начале описания — розовым */}
          <span className="text-[#FF6CF0]">AM-0</span>
          {preventOrphans(fest.about.text).replace(/^AM-0/, "")}
        </p>
      </section>

      {/* Лайнап (розовая секция) */}
      <section
        id="lineup"
        className="mt-24 scroll-mt-8 bg-[#FF6CF0] px-6 py-20 text-[#100030] sm:mt-32 sm:py-24"
      >
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-14 text-center">
          <div className="flex flex-col items-center gap-4">
            <Dot className="bg-[#100030]" />
            <h2 className="text-xl sm:text-3xl">{fest.lineup.heading}</h2>
          </div>

          <ul className="flex flex-col gap-1 text-lg leading-tight text-[#FFFFFF] sm:text-2xl">
            {fest.lineup.acts.map((act) => (
              <li key={act}>{act}</li>
            ))}
          </ul>

          <TicketButton className="bg-[#100030] px-10 py-4 text-lg text-[#FFFFFF] transition-transform hover:scale-105 sm:text-xl">
            {fest.ticketCta}
          </TicketButton>
        </div>
      </section>

      {/* Следите за нами */}
      <footer className="mx-auto w-full max-w-[700px] px-6 pb-16 pt-24 text-center sm:pt-40">
        <div className="flex flex-col items-center gap-4">
          <Dot className="bg-[#FF6CF0]" />
          <h2 className="text-xl text-[#FF6CF0] sm:text-3xl">
            {preventOrphans(fest.follow.heading)}
          </h2>
        </div>

        <div className="mx-auto mt-10 flex max-w-[600px] justify-center gap-6">
          <a
            href={fest.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="flex-1 bg-[#FF6CF0] py-4 text-lg text-[#100030] transition-transform hover:scale-105 sm:text-xl"
          >
            tG
          </a>
          <a
            href={fest.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex-1 bg-[#FF6CF0] py-4 text-lg text-[#100030] transition-transform hover:scale-105 sm:text-xl"
          >
            iNsT*
          </a>
        </div>
      </footer>

      {/* Сноска про Meta — прибита к самому низу сайта, мелкая и приглушённая */}
      <p className="mt-auto px-6 pb-3 pt-8 text-center text-[8px] leading-snug text-white/25 sm:text-[10px]">
        {preventOrphans(fest.follow.metaNote)}
      </p>
    </main>
  );
}
