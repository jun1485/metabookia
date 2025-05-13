import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VirtualRoomProps {
  children: ReactNode;
  roomName: string;
  roomDescription?: string;
  backgroundImage?: string;
  onExit?: () => void;
  isSolved?: boolean;
}

export default function VirtualRoom({
  children,
  roomName,
  roomDescription,
  backgroundImage,
  onExit,
  isSolved,
}: VirtualRoomProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [loading, setLoading] = useState(true);

  // 가상 로딩 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const backgroundStyle = {
    backgroundImage: backgroundImage
      ? `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.45)), url(${backgroundImage})`
      : "linear-gradient(to bottom right, var(--primary-dark), var(--secondary-dark))",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="relative min-h-[80vh] overflow-hidden rounded-2xl border border-light-400 dark:border-dark-100 shadow-xl perspective-1000"
      style={backgroundStyle}
    >
      {/* 3D 공간 효과를 주는 파티클 배경 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translateZ(${Math.random() * 100}px)`,
            }}
          />
        ))}
      </div>

      {/* 로딩 화면 */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark-400/90 flex items-center justify-center z-30"
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity },
              }}
              className="w-20 h-20 border-4 border-t-primary-500 border-r-secondary-500 border-b-accent-500 border-l-transparent rounded-full"
            />
            <p className="absolute mt-28 text-light-100 font-medium">
              가상 공간으로 입장 중...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 방 소개 오버레이 */}
      <AnimatePresence>
        {showIntro && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-dark-400/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-20"
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white mb-4 text-center"
            >
              {roomName}
            </motion.h2>
            {roomDescription && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-light-300 max-w-lg text-center mb-8"
              >
                {roomDescription}
              </motion.p>
            )}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowIntro(false)}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-glow"
            >
              입장하기
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 성공 오버레이 */}
      <AnimatePresence>
        {isSolved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-dark-400/70 backdrop-blur-sm flex items-center justify-center z-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="bg-light-100/90 dark:bg-dark-100/90 rounded-2xl p-8 max-w-md mx-auto text-center shadow-2xl border border-primary-300 dark:border-primary-800"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">
                퍼즐 해결 완료!
              </h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                이 공간의 퍼즐을 모두 해결했습니다. 다음 단계로 이동하세요!
              </p>
              <button onClick={onExit} className="btn-primary">
                다음 공간으로
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 메인 콘텐츠 */}
      <div className="relative p-6 z-10 min-h-[80vh] flex items-center justify-center">
        {!showIntro && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* HUD / UI 요소 */}
      {!showIntro && !loading && (
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect px-4 py-2 rounded-lg"
          >
            <span className="text-white text-sm font-medium">{roomName}</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowIntro(true)}
            className="glass-effect p-2 rounded-lg text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      )}
    </div>
  );
}
