"use client";

import { useState } from "react";
import InteractivePuzzle from "../components/InteractivePuzzle";
import VirtualRoom from "../components/VirtualRoom";
import VirtualGuide from "../components/VirtualGuide";

const roomData = {
  name: "메타북 퍼즐 챌린지 룸",
  description:
    "책과 관련된 다양한 퍼즐을 풀고 가상 세계를 탐험하세요. 거장 작가들의 작품 속 세계로 여행을 떠나봅시다.",
  backgroundImage: "/images/rooms/library-bg.jpg",
};

const introMessages = [
  "안녕하세요, 메타북 세계에 오신 것을 환영합니다! 저는 여러분의 가이드 '리브라'입니다.",
  "이곳은 책과 관련된 지식을 테스트하고 책 속 세계를 탐험할 수 있는 특별한 공간이에요.",
  "책 시리즈 순서 맞추기나 캐릭터 짝 맞추기 같은 퍼즐을 풀면서 진행해보세요.",
  "준비가 되셨나요? 그럼 첫 번째 챌린지를 시작해볼까요? 행운을 빕니다!",
];

export default function PuzzlePage() {
  const [showGuide, setShowGuide] = useState(true);
  const [isSolved, setIsSolved] = useState(false);

  const handlePuzzleSolved = () => {
    setIsSolved(true);
  };

  const handleExitRoom = () => {
    // 다음 방으로 이동하는 로직
    setIsSolved(false);
    // 여기에 다른 방으로 이동하는 코드 추가
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-400 to-dark-500 p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        <VirtualRoom
          roomName={roomData.name}
          roomDescription={roomData.description}
          backgroundImage={roomData.backgroundImage}
          isSolved={isSolved}
          onExit={handleExitRoom}
        >
          {showGuide ? (
            <VirtualGuide
              name="리브라"
              avatar="/images/rooms/avatar-librarian.jpg"
              messages={introMessages}
              onComplete={() => setShowGuide(false)}
            />
          ) : (
            <InteractivePuzzle onComplete={handlePuzzleSolved} />
          )}
        </VirtualRoom>
      </div>
    </div>
  );
}
