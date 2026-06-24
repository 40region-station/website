/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статический экспорт → отдаётся nginx как статика
  output: "export",

  // В статическом экспорте оптимизатор изображений Next недоступен
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,
  poweredByHeader: false,

  // Со слешем на конце удобнее раздавать статику nginx-ом
  trailingSlash: true,
};

module.exports = nextConfig;
