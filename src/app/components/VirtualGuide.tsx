import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VirtualGuideProps {
  name: string;
  avatar: string;
  messages: string[];
  onComplete?: () => void;
}

export default function VirtualGuide({
  name,
  avatar,
  messages,
  onComplete,
}: VirtualGuideProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState("");

  const currentMessage = messages[currentMessageIndex];

  // 타이핑 효과
  useEffect(() => {
    if (!currentMessage) return;

    setTyping(true);
    setDisplayedText("");

    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText(currentMessage.substring(0, index));
      index++;

      if (index > currentMessage.length) {
        clearInterval(timer);
        setTyping(false);
      }
    }, 30); // 타이핑 속도

    return () => clearInterval(timer);
  }, [currentMessage, currentMessageIndex]);

  const handleNext = () => {
    if (typing) {
      // 타이핑 중일 때 클릭하면 메시지 전체 표시
      setDisplayedText(currentMessage);
      setTyping(false);
      return;
    }

    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-effect border border-light-400/30 dark:border-dark-100/30 rounded-xl p-4 max-w-lg mx-auto"
    >
      <div className="flex items-start space-x-4">
        {/* 아바타 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden border-2 border-primary-500"
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-600 flex items-center justify-center text-white text-xl font-bold">
              {name.substring(0, 1).toUpperCase()}
            </div>
          )}
        </motion.div>

        {/* 대화 말풍선 */}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="font-bold text-white mr-2">{name}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-700 text-white">
              가이드
            </span>
          </div>

          <div
            className="bg-dark-100/70 rounded-lg p-3 text-light-100 min-h-[60px] relative"
            onClick={handleNext}
          >
            <p>{displayedText}</p>

            {/* 타이핑 표시기 */}
            <AnimatePresence>
              {typing && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block ml-1"
                >
                  <span className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </motion.span>
              )}
            </AnimatePresence>

            {/* 다음 버튼 표시 (타이핑 완료 시) */}
            <AnimatePresence>
              {!typing && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute bottom-2 right-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 9.586V5a1 1 0 012 0v4.586l1.293-1.293a1 1 0 011.414 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 진행 표시기 */}
          <div className="flex justify-between items-center mt-2 text-xs text-light-300">
            <span>
              {currentMessageIndex + 1} / {messages.length}
            </span>
            {!typing && currentMessageIndex < messages.length - 1 && (
              <span>클릭하여 계속</span>
            )}
            {!typing && currentMessageIndex === messages.length - 1 && (
              <span>클릭하여 완료</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
