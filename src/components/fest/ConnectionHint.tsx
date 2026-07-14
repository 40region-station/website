"use client";

import { useEffect, useState } from "react";

/**
 * Мягкая подсказка про VPN на /fest.
 *
 * Проблема: сайт крутится на РФ-сервере, а билеты — на Nethouse (тоже РФ). Через
 * зарубежный VPN коннект к этим хостам может тормозить или блокироваться, и
 * попап-форма билетов открывается медленно/не открывается — теряем покупателя.
 *
 * Надёжно «детектить VPN» на клиенте нельзя (VPN не меняет ни таймзону, ни
 * navigator). Поэтому меряем не причину, а симптом — реальную задержку до
 * Nethouse: грузим крохотный ресурс с events.nethouse.ru и засекаем время. Если
 * дольше порога или вообще не пришёл ответ (заблокировано) — показываем тост.
 * Так предупреждаем при любой медленной связи с РФ-сервисами, а на быстром
 * соединении (в т.ч. быстром VPN) не тревожим зря.
 *
 * Показываем максимум один раз на браузер (флаг в localStorage) — мягко, без
 * навязчивости. Порог подобран на глаз, правится через SLOW_MS.
 */
const PROBE_URL = "https://events.nethouse.ru/favicon.ico";
const SLOW_MS = 2500;
const STORAGE_KEY = "fest-conn-hint-shown";

export function ConnectionHint() {
  const [show, setShow] = useState(false);
  // Отдельный флаг для плавного появления (монтируем скрытым, затем показываем).
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // localStorage недоступен (приватный режим и т.п.) — просто продолжаем.
    }

    const start = performance.now();
    let settled = false;

    const decide = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      img.onload = img.onerror = null;
      const elapsed = performance.now() - start;
      if (elapsed < SLOW_MS) return; // связь быстрая — подсказка не нужна
      setShow(true);
      // Двойной rAF, чтобы браузер применил стартовые классы до перехода.
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // не смогли запомнить — не критично
      }
    };

    const img = new Image();
    img.onload = decide;
    img.onerror = decide; // 404 прилетит быстро (хост доступен) — это ОК, тоста не будет
    // Если ни load, ни error не пришли за порог — считаем связь медленной/битой.
    const timer = setTimeout(decide, SLOW_MS + 500);
    img.src = `${PROBE_URL}?_=${Date.now()}`;

    return () => {
      settled = true;
      clearTimeout(timer);
      img.onload = img.onerror = null;
    };
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      className={`fixed inset-x-2 bottom-2 z-50 mx-auto flex max-w-[540px] items-start gap-3 border border-[#FF6CF0] bg-[#100030] px-5 py-4 text-[16px] leading-[1.35] text-[#F7FAFF] shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 sm:bottom-4 sm:px-6 sm:py-5 sm:text-[17px] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <p className="flex-1">
        Билеты и сайт работают на серверах в России. Похоже, соединение
        медленное — если включён <b className="text-[#FF6CF0]">VPN</b>, попробуйте
        отключить его для этого сайта.
      </p>
      <button
        type="button"
        onClick={() => setShow(false)}
        aria-label="Закрыть"
        className="shrink-0 text-[22px] leading-none text-[#FF6CF0] transition-opacity hover:opacity-70"
      >
        ✕
      </button>
    </div>
  );
}
