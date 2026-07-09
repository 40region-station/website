import Script from "next/script";

/**
 * Счётчик Яндекс.Метрики (id 110514769).
 *
 * Ставится в корневой layout — покрывает и основной сайт, и лендинг `/fest`
 * (статический экспорт: каждая страница — отдельный HTML, счётчик срабатывает
 * на каждой загрузке). Включены Вебвизор, карта кликов, точный показатель
 * отказов и отслеживание внешних ссылок — как в коде счётчика из кабинета.
 *
 * Загрузка через `next/script` со стратегией afterInteractive: тег уходит в
 * статику, скрипт грузится после интерактивности, не блокируя рендер.
 * `<noscript>`-пиксель — фолбэк для клиентов без JS.
 */
const COUNTER_ID = 110514769;

export function YandexMetrika() {
  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}', 'ym');

        ym(${COUNTER_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${COUNTER_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
