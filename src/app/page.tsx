"use client";

import { getAllSeries } from "./data/books";
import BookSeriesList from "./components/BookSeriesList";
import Link from "next/link";
import { getEscapeRooms } from "./data/escape-rooms";
import { motion } from "framer-motion";

export default function Home() {
  const seriesList = getAllSeries();
  const escapeRooms = getEscapeRooms();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-light-200 dark:bg-dark-300 p-4 md:p-8">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-3 text-primary-700 dark:text-primary-400">
          메타 북키아
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          당신이 좋아하는 책 시리즈를 탐험하세요
        </p>
      </motion.header>

      {/* 메타버스 북클럽 소개 */}
      <motion.section
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/60 dark:to-secondary-900/60 rounded-xl overflow-hidden shadow-lg"
      >
        <div className="p-6 md:p-8">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-4 text-primary-700 dark:text-primary-300"
          >
            메타버스 북클럽
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg mb-6 text-gray-700 dark:text-gray-200"
          >
            책을 읽는 것을 넘어 책 속 세계로 직접 들어가보세요. 메타버스
            북클럽에서는 방탈출 게임처럼 수수께끼를 풀며 책 속 모험을 경험할 수
            있습니다.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
          >
            {escapeRooms.map((room) => (
              <motion.div
                key={room.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                className="bg-white dark:bg-dark-100 rounded-lg shadow-md overflow-hidden border border-light-400 dark:border-dark-200"
              >
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-primary-700 dark:text-primary-300">
                    {room.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {room.description}
                  </p>
                  <Link
                    href={`/escape-room/${room.id}`}
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    도전하기
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 인터랙티브 퍼즐 섹션 추가 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 p-5 bg-secondary-100 dark:bg-secondary-900/40 rounded-xl border border-secondary-200 dark:border-secondary-800/50"
          >
            <h3 className="font-bold text-xl mb-3 text-secondary-700 dark:text-secondary-300">
              인터랙티브 퍼즐 도전
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              드래그 앤 드롭으로 해결하는 인터랙티브 퍼즐에 도전해보세요!
            </p>
            <Link
              href="/interactive-puzzle"
              className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white px-5 py-2 rounded-lg transition-colors shadow-md"
            >
              퍼즐 도전하기
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#book-series"
                className="inline-block bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
              >
                먼저 책을 살펴보기
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.main
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        id="book-series"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary-700 dark:text-secondary-400">
          책 시리즈
        </h2>
        <BookSeriesList seriesList={seriesList} />
      </motion.main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 py-6 text-center text-gray-500 dark:text-gray-400 text-sm"
      >
        <p>© 2025 메타 북키아. 모든 권리 보유.</p>
      </motion.footer>
    </div>
  );
}
