// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: {},
  // 프로덕션 환경에서만 standalone 모드 활성화 (CI/CD 파이프라인용)
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  experimental: {
    // symlink 문제 해결을 위한 설정
    outputFileTracingRoot: process.cwd(),
  },
};
