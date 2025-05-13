import { useState } from "react";
import DragDropPuzzle from "./DragDropPuzzle";
import CardMatchingPuzzle from "./CardMatchingPuzzle";
import { PuzzleSet } from "../data/types/puzzleTypes";
import { motion } from "framer-motion";

// 퍼즐 데이터 세트 예시
const bookOrderPuzzle: PuzzleSet = {
  id: "harry-potter-order",
  title: "해리 포터 책 순서 맞추기",
  description: "해리 포터 시리즈의 책을 순서대로 정렬해보세요!",
  puzzleItems: [
    { id: "book-6", content: "해리 포터와 혼혈왕자", correctPosition: 5 },
    { id: "book-0", content: "해리 포터와 마법사의 돌", correctPosition: 0 },
    { id: "book-2", content: "해리 포터와 비밀의 방", correctPosition: 1 },
    { id: "book-5", content: "해리 포터와 불사조 기사단", correctPosition: 4 },
    {
      id: "book-1",
      content: "해리 포터와 아즈카반의 죄수",
      correctPosition: 2,
    },
    { id: "book-3", content: "해리 포터와 불의 잔", correctPosition: 3 },
    { id: "book-4", content: "해리 포터와 죽음의 성물", correctPosition: 6 },
  ],
  reward: "축하합니다! 다음 단계로 진행할 수 있습니다.",
};

const characterMatchPuzzle: PuzzleSet = {
  id: "character-match",
  title: "반지의 제왕 캐릭터 순서",
  description: "반지의 제왕 캐릭터들을 등장 순서대로 정렬해보세요!",
  puzzleItems: [
    { id: "char-3", content: "레골라스", correctPosition: 3 },
    { id: "char-0", content: "프로도", correctPosition: 0 },
    { id: "char-2", content: "간달프", correctPosition: 2 },
    { id: "char-1", content: "아라곤", correctPosition: 1 },
    { id: "char-4", content: "김리", correctPosition: 4 },
  ],
  reward: "반지의 제왕 퀴즈를 모두 맞추셨습니다!",
};

// 카드 매칭 퍼즐 데이터
const cardMatchingData = {
  id: "character-emoji-match",
  title: "책 속 캐릭터와 이모지 매칭",
  description: "책 속 캐릭터에 맞는 이모지를 찾아 짝을 맞춰보세요!",
  cards: [
    { content: "🧙‍♂️" }, // 마법사
    { content: "👑" }, // 왕관
    { content: "🧝‍♂️" }, // 엘프
    { content: "🔮" }, // 수정구슬
    { content: "🪄" }, // 마법봉
    { content: "🐉" }, // 용
  ],
  reward: "카드 매칭 퍼즐을 완료했습니다!",
};

// 사용 가능한 퍼즐 목록
const availablePuzzles = [bookOrderPuzzle, characterMatchPuzzle];

type PuzzleType = "dragDrop" | "cardMatching";

interface InteractivePuzzleProps {
  onComplete?: () => void;
}

export default function InteractivePuzzle({
  onComplete,
}: InteractivePuzzleProps) {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [solvedPuzzles, setSolvedPuzzles] = useState<string[]>([]);
  const [puzzleType, setPuzzleType] = useState<PuzzleType>("dragDrop");

  const currentPuzzle = availablePuzzles[currentPuzzleIndex];

  const handlePuzzleSolved = () => {
    setShowReward(true);
    setSolvedPuzzles([...solvedPuzzles, currentPuzzle.id]);

    // 모든 퍼즐이 해결되었는지 확인
    const allDragDropPuzzlesSolved =
      currentPuzzleIndex === availablePuzzles.length - 1;
    const cardPuzzleSolved =
      puzzleType === "cardMatching" &&
      solvedPuzzles.includes(cardMatchingData.id);

    // 모든 퍼즐이 해결되었고 onComplete 콜백이 제공된 경우
    if (allDragDropPuzzlesSolved && cardPuzzleSolved && onComplete) {
      // 약간의 지연 후 onComplete 호출
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleCardPuzzleSolved = () => {
    setShowReward(true);
    setSolvedPuzzles([...solvedPuzzles, cardMatchingData.id]);

    // 모든 드래그 앤 드롭 퍼즐이 해결되었는지 확인
    const allDragDropPuzzlesSolved = availablePuzzles.every((puzzle) =>
      solvedPuzzles.includes(puzzle.id)
    );

    // 모든 퍼즐이 해결되었고 onComplete 콜백이 제공된 경우
    if (allDragDropPuzzlesSolved && onComplete) {
      // 약간의 지연 후 onComplete 호출
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleNextPuzzle = () => {
    if (
      puzzleType === "dragDrop" &&
      currentPuzzleIndex < availablePuzzles.length - 1
    ) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
      setShowReward(false);
    } else {
      // 마지막 드래그 앤 드롭 퍼즐이었다면 카드 매칭으로 전환
      setPuzzleType("cardMatching");
      setShowReward(false);
    }
  };

  return (
    <div className="py-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gradient mb-2">
          인터랙티브 퍼즐
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {puzzleType === "dragDrop"
            ? "순서를 맞추는 드래그 앤 드롭 퍼즐을 풀어보세요!"
            : "짝을 맞추는 카드 뒤집기 게임에 도전하세요!"}
        </p>
      </div>

      <div className="relative">
        {puzzleType === "dragDrop" ? (
          <DragDropPuzzle
            title={currentPuzzle.title}
            description={currentPuzzle.description}
            puzzleItems={currentPuzzle.puzzleItems}
            onSolve={handlePuzzleSolved}
          />
        ) : (
          <CardMatchingPuzzle
            title={cardMatchingData.title}
            description={cardMatchingData.description}
            cards={cardMatchingData.cards}
            onSolve={handleCardPuzzleSolved}
          />
        )}

        {showReward && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-lg text-center"
          >
            <p className="font-medium text-primary-800 dark:text-primary-300 mb-3">
              {puzzleType === "dragDrop"
                ? currentPuzzle.reward
                : cardMatchingData.reward}
            </p>
            {puzzleType === "dragDrop" &&
              (currentPuzzleIndex < availablePuzzles.length - 1 || true) && (
                <button
                  onClick={handleNextPuzzle}
                  className="btn-primary py-2 px-4 text-sm"
                >
                  {currentPuzzleIndex < availablePuzzles.length - 1
                    ? "다음 퍼즐로 이동"
                    : "카드 매칭 게임으로 이동"}
                </button>
              )}
          </motion.div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-200">
        <p>
          진행도: {solvedPuzzles.length}/{availablePuzzles.length + 1}
        </p>
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex">
          <button
            onClick={() => {
              setPuzzleType("dragDrop");
              setShowReward(false);
            }}
            className={`px-4 py-2 rounded-l-lg border ${
              puzzleType === "dragDrop"
                ? "bg-primary-600 text-white border-primary-600"
                : "bg-light-200/90 dark:bg-dark-200/90 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            }`}
          >
            순서 맞추기
          </button>
          <button
            onClick={() => {
              setPuzzleType("cardMatching");
              setShowReward(false);
            }}
            className={`px-4 py-2 rounded-r-lg border ${
              puzzleType === "cardMatching"
                ? "bg-secondary-600 text-white border-secondary-600"
                : "bg-light-200/90 dark:bg-dark-200/90 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            }`}
          >
            카드 짝 맞추기
          </button>
        </div>
      </div>
    </div>
  );
}
