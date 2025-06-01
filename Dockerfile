# 베이스 이미지
FROM node:20-alpine AS base

# 의존성 설치
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# pnpm 설치
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# 의존성 파일 복사 및 설치
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 빌더 설정
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 환경 변수 설정
ENV NODE_ENV=production

# Next.js 빌드
RUN pnpm build

# 빌드 결과 확인
RUN ls -la ./.next/

# 프로덕션 이미지
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# 필요한 파일 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# .next 디렉토리 복사
COPY --from=builder /app/.next ./.next

# standalone 모드 파일이 있으면 복사
COPY --from=builder /app/.next/standalone ./ || true

# 필요한 의존성 설치
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --prod --frozen-lockfile

# 사용자 설정
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

ENV PORT 3000

# 시작 명령어
CMD if [ -f "./server.js" ]; then \
        node server.js; \
    else \
        node node_modules/next/dist/bin/next start; \
    fi 