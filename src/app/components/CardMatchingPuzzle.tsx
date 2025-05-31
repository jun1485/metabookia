import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface CardMatchingPuzzleProps {
  title: string;
  description: string;
  cards: { content: string }[];
  onSolve: () => void;
}

export default function CardMatchingPuzzle({
  title,
  description,
  cards,
  onSolve,
}: CardMatchingPuzzleProps) {
  // 카드 데이터 생성 (각 카드는 쌍으로 존재)
  const [gameCards, setGameCards] = useState<Card[]>(() => {
    // 카드 쌍을 만들고 섞기
    const cardPairs = [
      ...cards.map((card, index) => ({
        id: index,
        content: card.content,
        isFlipped: false,
        isMatched: false,
      })),
      ...cards.map((card, index) => ({
        id: index + cards.length,
        content: card.content,
        isFlipped: false,
        isMatched: false,
      })),
    ].sort(() => Math.random() - 0.5);

    return cardPairs;
  });

  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 두 카드가 선택되었을 때
    if (flippedCards.length === 2) {
      setIsLocked(true);
      const [firstId, secondId] = flippedCards;

      // 매치 확인
      if (gameCards[firstId].content === gameCards[secondId].content) {
        // 매치된 경우
        setGameCards((prevCards) =>
          prevCards.map((card) =>
            flippedCards.includes(prevCards.indexOf(card))
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);
        setIsLocked(false);
      } else {
        // 매치되지 않은 경우
        setTimeout(() => {
          setGameCards((prevCards) =>
            prevCards.map((card) =>
              flippedCards.includes(prevCards.indexOf(card))
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  }, [flippedCards, gameCards]);

  useEffect(() => {
    // 모든 카드가 매치되었는지 확인
    if (gameCards.every((card) => card.isMatched) && gameCards.length > 0) {
      setIsComplete(true);
      onSolve();
    }
  }, [gameCards, onSolve]);

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    if (gameCards[index].isFlipped || gameCards[index].isMatched) return;
    if (flippedCards.length === 2) return;

    // 카드 뒤집기
    setGameCards((prevCards) =>
      prevCards.map((card, idx) =>
        idx === index ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards((prev) => [...prev, index]);
  };

  return (
    <div className="bg-light-200 dark:bg-dark-100 rounded-xl p-6 shadow-lg border border-light-400 dark:border-dark-200 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2 text-gradient">{title}</h2>
      <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
        {description}
      </p>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {gameCards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
            onClick={() => handleCardClick(index)}
            className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 transform ${
              card.isMatched ? "opacity-60" : "opacity-100"
            }`}
          >
            <div
              className={`w-full h-full rounded-lg flex items-center justify-center font-bold text-xl relative ${
                card.isFlipped || card.isMatched
                  ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border-2 border-primary-300 dark:border-primary-700"
                  : "bg-secondary-600 dark:bg-secondary-700 text-white"
              }`}
            >
              {card.isFlipped || card.isMatched ? card.content : "?"}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="text-gray-600 dark:text-gray-300">
          이동 횟수: {moves}
        </div>
        {isComplete && (
          <div className="text-primary-600 dark:text-primary-400 font-bold">
            완료!
          </div>
        )}
      </div>
    </div>
  );
}
