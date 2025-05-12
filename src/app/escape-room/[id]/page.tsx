"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getEscapeRoomById } from "@/app/data/escape-rooms";
import { EscapeRoom, Puzzle } from "@/app/data/types";
import { getBookById } from "@/app/data/books";

export default function EscapeRoomPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [escapeRoom, setEscapeRoom] = useState<EscapeRoom | null>(null);
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [metaverseMode, setMetaverseMode] = useState("entrance"); // entrance, puzzle, completed

  // 3D 메타버스 환경 관련 상태
  const [roomPosition, setRoomPosition] = useState({ x: 0, y: 0 });
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 80 });

  useEffect(() => {
    const room = getEscapeRoomById(params.id);
    if (room) {
      setEscapeRoom(room);
      const bookData = getBookById(room.bookId);
      setBook(bookData);
      if (room.puzzles.length > 0) {
        setCurrentPuzzle(room.puzzles[0]);
      }
      setLoading(false);
    } else {
      router.push("/");
    }
  }, [params.id, router]);

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPuzzle) return;

    // 답변 검증 (대소문자 무시하고 공백 제거)
    const userAnswerClean = userAnswer.trim().toLowerCase();
    const correctAnswerClean = currentPuzzle.answer.trim().toLowerCase();

    if (userAnswerClean === correctAnswerClean) {
      setIsCorrect(true);

      // 3초 후 다음 퍼즐로 이동
      setTimeout(() => {
        if (escapeRoom && currentPuzzleIndex < escapeRoom.puzzles.length - 1) {
          setCurrentPuzzleIndex(currentPuzzleIndex + 1);
          setCurrentPuzzle(escapeRoom.puzzles[currentPuzzleIndex + 1]);
          setUserAnswer("");
          setIsCorrect(null);
          setShowHint(false);
          setHintIndex(0);

          // 방 이동 효과
          moveToNextRoom();
        } else {
          // 게임 종료
          setGameCompleted(true);
          setMetaverseMode("completed");
        }
      }, 3000);
    } else {
      setIsCorrect(false);
    }
  };

  const moveToNextRoom = () => {
    // 캐릭터를 출구로 이동시키고, 새로운 방으로 이동
    setCharacterPosition({ x: 90, y: 50 });

    setTimeout(() => {
      setRoomPosition({
        x: roomPosition.x - 100,
        y: roomPosition.y,
      });
      setCharacterPosition({ x: 10, y: 50 });
    }, 1000);
  };

  const showNextHint = () => {
    if (!currentPuzzle) return;

    if (hintIndex < currentPuzzle.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
    setShowHint(true);
  };

  const enterMetaverse = () => {
    setMetaverseMode("puzzle");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-200 dark:bg-dark-300">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl text-gray-600 dark:text-gray-300"
        >
          방탈출 게임을 로딩 중입니다...
        </motion.div>
      </div>
    );
  }

  if (metaverseMode === "entrance") {
    return (
      <div className="min-h-screen gradient-bg text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold my-12 text-primary-300"
          >
            {escapeRoom?.title}
          </motion.h1>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-lg overflow-hidden shadow-2xl bg-dark-200/60 backdrop-blur-sm p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">
              메타버스 북클럽에 오신 것을 환영합니다
            </h2>
            <p className="text-lg mb-8">
              {book?.title} 세계로 들어갑니다. 이 가상 공간에서 여러분은 책 속
              이야기의 주인공이 되어 다양한 수수께끼를 풀고 모험을 즐길 수
              있습니다.
            </p>

            <div className="bg-gradient-to-r from-primary-800/70 to-secondary-800/70 p-6 rounded-lg mb-8">
              <p className="font-semibold mb-4">{escapeRoom?.description}</p>
              <p className="text-sm text-primary-200">
                총 {escapeRoom?.puzzles.length}개의 수수께끼가 준비되어
                있습니다.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={enterMetaverse}
              className="btn-primary"
            >
              메타버스 입장하기
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href={`/book/${book?.id}`}
              className="text-primary-300 hover:text-primary-200"
            >
              ← 책 페이지로 돌아가기
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (metaverseMode === "completed") {
    return (
      <div className="min-h-screen gradient-bg text-white p-4 md:p-8 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center bg-dark-200/60 backdrop-blur-sm p-8 rounded-lg"
        >
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
            }}
            className="text-4xl md:text-5xl font-bold mb-8 text-yellow-300"
          >
            축하합니다!
          </motion.h1>

          <div className="mb-8 p-6 bg-primary-900/50 rounded-lg">
            <p className="text-xl mb-6">{escapeRoom?.completionMessage}</p>
            <p className="text-lg">
              성공적으로 모든 수수께끼를 풀고 {book?.title} 메타버스 방탈출을
              완료했습니다.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/book/${book?.id}`}
                className="inline-block btn-secondary"
              >
                책 페이지로 돌아가기
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="inline-block btn-primary">
                메인 페이지로 돌아가기
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg text-white p-4 md:p-8 overflow-hidden">
      {/* 메타버스 환경 */}
      <div className="relative w-full h-[60vh] mb-6 overflow-hidden border-4 border-primary-500 rounded-lg shadow-2xl">
        {/* 가상 방 */}
        <motion.div
          animate={{
            x: `${roomPosition.x}%`,
            y: `${roomPosition.y}%`,
          }}
          transition={{ duration: 1 }}
          className="absolute w-[300%] h-full bg-gradient-to-r from-primary-800/50 via-secondary-900/50 to-primary-900/50"
        >
          {/* 벽과 바닥 요소들 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-400/70"></div>
          <div
            className="absolute bottom-0 left-0 right-0 h-24 bg-dark-300/80"
            style={{ boxShadow: "0 -8px 16px rgba(0,0,0,0.2)" }}
          ></div>

          {/* 방 장식 요소들 */}
          <div className="absolute left-[30%] top-[30%] w-16 h-24 bg-primary-700/30 rounded-md"></div>
          <div className="absolute left-[60%] top-[40%] w-20 h-20 bg-secondary-700/30 rounded-full"></div>
          <div className="absolute left-[20%] top-[60%] w-12 h-12 bg-yellow-500/20 rounded-md"></div>

          {/* 문제 아이템 */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-yellow-300 text-primary-900 p-4 rounded-lg shadow-lg">
              <span className="text-xl font-bold">!</span>
            </div>
          </motion.div>

          {/* 출구 */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-green-500 w-8 h-16 rounded-t-lg"
            />
          </div>
        </motion.div>

        {/* 플레이어 캐릭터 */}
        <motion.div
          animate={{
            left: `${characterPosition.x}%`,
            top: `${characterPosition.y}%`,
          }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute w-8 h-8 bg-secondary-500 rounded-full shadow-lg z-10"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* 현재 퍼즐 정보 */}
        <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 p-4 rounded-lg">
          <h2 className="font-bold text-yellow-300">{currentPuzzle?.title}</h2>
          <p className="text-sm text-gray-300">{currentPuzzle?.description}</p>
        </div>
      </div>

      {/* 퍼즐 인터페이스 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-dark-200/80 backdrop-blur-sm p-6 rounded-lg shadow-xl"
      >
        {currentPuzzle && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary-300">
              {currentPuzzle.title}
            </h2>
            <p className="mb-6 text-gray-200">{currentPuzzle.description}</p>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-primary-900/50 p-4 rounded-lg mb-6"
            >
              <p className="text-lg font-medium text-white">
                {currentPuzzle.question}
              </p>
            </motion.div>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-secondary-900/50 p-4 rounded-lg mb-6 overflow-hidden"
                >
                  <h3 className="text-sm text-secondary-300 mb-2">
                    힌트 {hintIndex + 1}:
                  </h3>
                  <p className="text-gray-200">
                    {currentPuzzle.hints[hintIndex]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleAnswerSubmit} className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="정답을 입력하세요"
                  className="flex-1 bg-dark-100 border border-primary-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-accent"
                >
                  확인
                </motion.button>
              </div>
            </form>

            <AnimatePresence>
              {isCorrect === true && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-800/70 text-green-200 p-4 rounded-lg mb-4"
                >
                  <p className="font-bold">
                    정답입니다! 다음 퍼즐로 이동합니다...
                  </p>
                </motion.div>
              )}

              {isCorrect === false && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-800/70 text-red-200 p-4 rounded-lg mb-4"
                >
                  <p className="font-bold">틀렸습니다. 다시 시도해보세요.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={showNextHint}
                className="text-secondary-300 hover:text-secondary-200"
                disabled={
                  showHint && hintIndex >= currentPuzzle.hints.length - 1
                }
              >
                {!showHint
                  ? "힌트 보기"
                  : hintIndex < currentPuzzle.hints.length - 1
                  ? "다음 힌트"
                  : "모든 힌트를 확인했습니다"}
              </motion.button>

              <div className="text-sm text-gray-400">
                퍼즐 {currentPuzzleIndex + 1} / {escapeRoom?.puzzles.length}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
