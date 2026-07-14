"use client";

import { useEffect, useRef } from "react";

/**
 * Анимированный герой /fest: зациклённое видео с расцветающим леттерингом «АМО»
 * вместо статичного логотипа. Видео декоративное (aria-hidden) — смысловую роль
 * (заголовок страницы) несёт sr-only <h1> рядом в разметке.
 *
 * Оптимизация. Исходная Lottie-анимация весила ~112 МБ — в браузер её тащить
 * нельзя. Отдаём вместо неё сжатый h264-mp4 (~2 МБ) + постер-кадр (~100 КБ):
 * poster показывается мгновенно (важно для LCP и как фолбэк без JS/автоплея), а
 * видео стартует ровно с этого же (первого) кадра — поэтому переход постер→видео
 * бесшовный, без «прыжка».
 *
 * Автоплей не ставим атрибутом, а запускаем из эффекта: так уважаем
 * prefers-reduced-motion (при «уменьшить движение» остаётся статичный постер) и
 * избегаем рассинхрона гидрации.
 *
 * Надёжность автоплея на iOS/WebKit (в т.ч. «Chrome» на iPhone — там тот же
 * WebKit): (1) явно выставляем `video.muted = true` — React применяет атрибут
 * `muted` ненадёжно (facebook/react#10389), а без реального muted WebKit
 * блокирует автоплей; (2) если play() всё же отклонён (Low Power Mode, политика
 * браузера) — стартуем при первом жесте пользователя (одноразовые пассивные
 * слушатели). Если и это не сработало — корректно остаётся статичный постер.
 *
 * Ассеты сгенерированы из исходного рендера (1200×674, 25 fps; в репозитории не
 * хранится — держим отдельно). Воспроизвести:
 *   ffmpeg -i hero.source.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p \
 *     -crf 27 -preset veryslow -movflags +faststart -an public/fest/hero.mp4
 *   ffmpeg -i public/fest/hero.mp4 -frames:v 1 -q:v 3 public/fest/hero-poster.jpg
 */
export function FestHero() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // При «уменьшить движение» видео не грузим вовсе (preload="none" в разметке) —
    // остаётся статичный постер. Иначе разрешаем подгрузку и запускаем.
    if (reduce) return;
    // Дублируем muted свойством (не только атрибутом) — иначе iOS/WebKit может
    // счесть видео «со звуком» и заблокировать автоплей.
    video.muted = true;
    video.preload = "auto";

    let removeGestureListeners = () => {};
    const onGesture = () => {
      removeGestureListeners();
      video.play().catch(() => {});
    };

    video.play().catch(() => {
      // Автоплей отклонён — пробуем стартовать при первом взаимодействии.
      const passive = { once: true, passive: true } as const;
      window.addEventListener("touchstart", onGesture, passive);
      window.addEventListener("scroll", onGesture, passive);
      window.addEventListener("click", onGesture, { once: true });
      removeGestureListeners = () => {
        window.removeEventListener("touchstart", onGesture);
        window.removeEventListener("scroll", onGesture);
        window.removeEventListener("click", onGesture);
      };
    });

    return () => removeGestureListeners();
  }, []);

  return (
    <video
      ref={ref}
      className="block w-full"
      width={1200}
      height={674}
      poster="/fest/hero-poster.jpg"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
    >
      <source src="/fest/hero.mp4" type="video/mp4" />
    </video>
  );
}
