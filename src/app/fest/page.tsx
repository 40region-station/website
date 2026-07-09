import { fest } from "@/content/fest";
import { preventOrphans } from "@/lib/typography";
import { TicketButton } from "@/components/fest/TicketButton";

/** Фирменная «точка» над заголовком секции. 6px на мобилке, 20px на десктопе. */
function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-1.5 w-1.5 rounded-full sm:h-5 sm:w-5 ${className ?? ""}`}
    />
  );
}

export default function FestPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-[#100030] text-[#F7FAFF] tracking-[-0.03em]">
      {/*
        Верх страницы. На мобилке визуально переворачиваем порядок
        (flex-col-reverse): сначала логотип «АМО», под ним — кнопка билетов, как
        в Figma. В DOM порядок «навбар → герой» сохраняем ради таб-порядка и
        скринридеров. A11y-нюанс (логотип перед навигацией на мобилке) — открыт,
        обсудить позже, см. заметку в памяти проекта.

        Отступы по краям: 8px на мобилке, 40px на десктопе — как у контейнера
        героя, который тянется на всю ширину.
      */}
      <div className="flex flex-col-reverse gap-10 px-2 pt-2 sm:flex-col sm:gap-20 sm:px-10 sm:pt-10">
        {/* Навбар. На мобилке боковые ссылки скрыты — как в макете, по центру только билеты. */}
        <header className="flex w-full items-center justify-center gap-4 text-[16px] leading-[0.98] sm:justify-between sm:text-[34px]">
          <a
            href={fest.nav[0].href}
            className="hidden shrink-0 transition-opacity hover:opacity-70 sm:block"
          >
            {fest.nav[0].label}
          </a>
          <TicketButton className="shrink-0 bg-[#FF6CF0] px-4 py-2 text-[#100030] transition-transform hover:scale-105">
            {fest.nav[1].label}
          </TicketButton>
          <a
            href={fest.nav[2].href}
            className="hidden shrink-0 transition-opacity hover:opacity-70 sm:block"
          >
            {fest.nav[2].label}
          </a>
        </header>

        {/* Герой. Логотип «АМО» — главный заголовок страницы (h1). Контейнер
            (тёмный фон + рамка + леттеринг) — единый svg, тянется на всю ширину. */}
        <section className="w-full min-w-0">
          <h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fest/amo.svg"
              alt="АМО"
              className="block w-full"
              width={1200}
              height={675}
            />
          </h1>
        </section>
      </div>

      {/* О фестивале */}
      <section
        id="about"
        className="mx-auto w-full max-w-[1080px] scroll-mt-8 px-6 py-10 text-center sm:py-40"
      >
        <div className="flex flex-col items-center gap-4 sm:gap-20">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <Dot className="bg-[#FF6CF0]" />
            <h2 className="text-[16px] leading-[0.98] text-[#FF6CF0] sm:text-[50px]">
              {preventOrphans(fest.about.heading)}
            </h2>
          </div>
          {/* Название «AM-0» в начале описания — белым, как весь текст (было розовым) */}
          <p className="text-[12px] leading-[1.1] sm:text-[40px]">
            {preventOrphans(fest.about.text)}
          </p>
        </div>
      </section>

      {/* Лайнап (розовая секция) */}
      <section
        id="lineup"
        className="scroll-mt-8 bg-[#FF6CF0] px-6 py-10 text-[#100030] sm:py-20"
      >
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-4 text-center sm:gap-20">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <Dot className="bg-[#100030]" />
            <h2 className="text-[16px] leading-[0.98] sm:text-[50px]">
              {fest.lineup.heading}
            </h2>
          </div>

          <ul className="text-[12px] leading-[1.1] text-[#F7FAFF] sm:text-[40px]">
            {fest.lineup.acts.map((act) => (
              <li key={act}>{act}</li>
            ))}
          </ul>

          {/* На мобилке кнопки тут нет — билеты вынесены наверх под логотип. */}
          <TicketButton className="hidden bg-[#100030] px-8 py-5 leading-[0.98] text-[#F7FAFF] transition-transform hover:scale-105 sm:inline-flex sm:text-[50px]">
            {fest.ticketCta}
          </TicketButton>
        </div>
      </section>

      {/* Следите за нами */}
      <footer className="mx-auto w-full max-w-[700px] px-6 pb-2 pt-10 text-center sm:pb-10 sm:pt-40">
        <div className="flex flex-col items-center gap-10 sm:gap-40">
          <div className="flex flex-col items-center gap-4 sm:gap-10">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <Dot className="bg-[#FF6CF0]" />
              <h2 className="text-[16px] leading-[0.98] text-[#FF6CF0] sm:text-[50px]">
                {preventOrphans(fest.follow.heading)}
              </h2>
            </div>

            <div className="flex w-full max-w-[600px] justify-center gap-2 sm:gap-10">
              <a
                href={fest.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex-1 bg-[#FF6CF0] py-2.5 text-[16px] leading-[0.98] text-[#100030] transition-transform hover:scale-105 sm:py-5 sm:text-[50px]"
              >
                tG
              </a>
              <a
                href={fest.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex-1 bg-[#FF6CF0] py-2.5 text-[16px] leading-[0.98] text-[#100030] transition-transform hover:scale-105 sm:py-5 sm:text-[50px]"
              >
                iNsT*
              </a>
            </div>
          </div>

          {/* Сноска про Meta — мелкая, приглушённо-розовая (rgba(255,152,245,0.3)). */}
          <p className="text-[6px] leading-[0.98] text-[#FF98F5]/30 sm:text-[18px]">
            {preventOrphans(fest.follow.metaNote)}
          </p>
        </div>
      </footer>
    </main>
  );
}
