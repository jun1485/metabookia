// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: {},
  // standalone 모드 비활성화 (로컬 개발 환경용)
  // output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  outputFileTracingRoot: process.cwd(),
};
