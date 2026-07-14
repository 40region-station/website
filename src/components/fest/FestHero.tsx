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
 * избегаем рассинхрона гидрации. Если браузер заблокирует play() — тоже остаётся
 * постер.
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
    video.preload = "auto";
    video.play().catch(() => {});
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
