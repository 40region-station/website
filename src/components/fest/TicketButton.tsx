"use client";

import { useEffect, useRef } from "react";
import { fest } from "@/content/fest";

const SCRIPT_ID = "nh-popup-form";
const SCRIPT_SRC = "https://events.nethouse.ru/assets/js/popup-form.js";

/**
 * Загружает popup-form.js Nethouse ровно один раз. Промис кэшируется на уровне
 * модуля, чтобы обе кнопки не грузили скрипт дважды.
 */
let loadPromise: Promise<void> | null = null;
function loadNethouse(): Promise<void> {
  if (loadPromise) return loadPromise;
  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(
      SCRIPT_ID,
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject();
    document.head.appendChild(s);
  });
  return loadPromise;
}

/**
 * Прогревает попап-форму заранее, чтобы клик открывал её мгновенно.
 *
 * Nethouse умеет предзагружать форму сам: по `DOMContentLoaded` его скрипт
 * сканирует триггеры с атрибутом `data-preloaded-form`, строит `<iframe>` формы
 * и паркует его за экраном; по клику форма просто «выезжает» (unpark). Но мы
 * подключаем скрипт в `useEffect` — уже ПОСЛЕ реального `DOMContentLoaded`, —
 * поэтому их сканер не вызывается. Функции `CalloutForm`/`showEventsNhForm` в
 * скрипте объявлены top-level `const` и в `window` не попадают, дёрнуть их
 * вручную нельзя. Единственная зацепка — их слушатель `DOMContentLoaded`:
 * ре-диспатчим это событие один раз после загрузки скрипта, и сканер отрабатывает
 * штатно (уже с проставленным `data-preloaded-form` на кнопках).
 */
let preloadDispatched = false;
function preloadForms(): void {
  if (preloadDispatched) return;
  preloadDispatched = true;
  document.dispatchEvent(new Event("DOMContentLoaded"));
}

/**
 * Кнопка покупки билета. Открывает встроенную попап-форму Nethouse.
 *
 * Тонкость: в popup-form.js функция объявлена как top-level `const
 * showEventsNhForm`, поэтому она НЕ попадает в `window.*`, а резолвится только
 * из inline-обработчика (именно так, как в инструкции Nethouse). Поэтому мы
 * программно проставляем настоящий атрибут `onclick`. Скрипт прогреваем при
 * монтировании, а саму форму — предзагружаем (см. `preloadForms`), чтобы к клику
 * iframe уже был построен и открытие было мгновенным. Если функции ещё нет (или
 * JS отключён) — inline-обработчик ничего не перехватывает и срабатывает обычный
 * переход по `href` на форму Nethouse (фолбэк).
 */
export function TicketButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.setAttribute(
        "onclick",
        `if(typeof showEventsNhForm==='function'){showEventsNhForm('${fest.ticketPopupUrl}');return false;}`,
      );
      // Помечаем кнопку для штатного предзагрузчика Nethouse (см. preloadForms).
      el.setAttribute("data-preloaded-form", "");
    }
    // После загрузки скрипта — один раз прогреваем форму, чтобы клик открывал её
    // мгновенно (обе кнопки шарят один кэшированный промис и один инстанс формы).
    loadNethouse().then(preloadForms).catch(() => {});
  }, []);

  return (
    <a
      ref={ref}
      href={fest.ticketUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
