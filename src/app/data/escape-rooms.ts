import { EscapeRoom, Puzzle } from "./types";

// 해리포터와 마법사의 돌 방탈출 수수께끼
const hp1Puzzles: Puzzle[] = [
  {
    id: "hp1-p1",
    bookId: "hp-1",
    title: "호그와트 입학 초대장",
    description:
      "호그와트 마법학교에 입학하기 위해서는 특별한 초대장을 받아야 합니다.",
    question:
      "호그와트 마법학교의 교장은 누구인가요? 힌트: 이름은 'A'로 시작합니다.",
    hints: [
      "그는 매우 현명한 마법사입니다.",
      "그의 전체 이름은 4개의 단어로 구성되어 있습니다.",
    ],
    answer: "알버스 덤블도어",
    nextPuzzleId: "hp1-p2",
  },
  {
    id: "hp1-p2",
    bookId: "hp-1",
    title: "마법의 열쇠",
    description:
      "지하실로 가는 문을 열기 위해서는 특별한 마법의 열쇠가 필요합니다.",
    question:
      "해리 포터가 마법사의 돌에 도달하기 전에 지나야 했던 마법사의 체스판에서 론이 맡은 역할은 무엇인가요?",
    hints: [
      "체스 말 중 하나였습니다.",
      "말 위에서 이동할 수 있는 말이었습니다.",
    ],
    answer: "나이트",
    nextPuzzleId: "hp1-p3",
  },
  {
    id: "hp1-p3",
    bookId: "hp-1",
    title: "마법사의 돌",
    description: "마법사의 돌을 찾아내기 위한 마지막 수수께끼입니다.",
    question:
      "해리가 퀴렐 교수와 대면했을 때, 그의 뒤통수에서 나온 것은 무엇인가요?",
    hints: ["어둠의 마법사입니다.", "그는 해리의 부모님을 죽인 장본인입니다."],
    answer: "볼드모트",
    nextPuzzleId: undefined,
  },
];

// 해리포터와 비밀의 방 방탈출 수수께끼
const hp2Puzzles: Puzzle[] = [
  {
    id: "hp2-p1",
    bookId: "hp-2",
    title: "이상한 속삭임",
    description: "호그와트 성 안에서 이상한 속삭임이 들려옵니다.",
    question: "해리가 들을 수 있는 이상한 속삭임은 어떤 언어인가요?",
    hints: [
      "뱀과 관련이 있습니다.",
      "살라자르 슬리데린이 사용했던 언어입니다.",
    ],
    answer: "파셀텅",
    nextPuzzleId: "hp2-p2",
  },
  {
    id: "hp2-p2",
    bookId: "hp-2",
    title: "비밀의 방 입구",
    description: "비밀의 방 입구를 찾기 위한 수수께끼입니다.",
    question: "비밀의 방 입구는 호그와트의 어느 곳에 숨겨져 있나요?",
    hints: ["여학생이 이용하는 곳입니다.", "울보 머틀이 자주 머무는 곳입니다."],
    answer: "화장실",
    nextPuzzleId: "hp2-p3",
  },
  {
    id: "hp2-p3",
    bookId: "hp-2",
    title: "바실리스크와의 대결",
    description: "비밀의 방에 있는 괴물과 싸워야 합니다.",
    question: "해리는 무엇을 이용해 바실리스크를 물리쳤나요?",
    hints: ["그것은 마법 무기입니다.", "그리핀도르와 관련이 있습니다."],
    answer: "그리핀도르의 검",
    nextPuzzleId: undefined,
  },
];

// 해리포터 시리즈 방탈출 게임
export const escapeRooms: EscapeRoom[] = [
  {
    id: "escape-hp1",
    bookId: "hp-1",
    title: "마법사의 돌을 찾아서",
    description:
      "호그와트 마법학교에서 마법사의 돌을 지켜내기 위한 모험을 떠나세요!",
    puzzles: hp1Puzzles,
    completionMessage:
      "축하합니다! 마법사의 돌을 성공적으로 찾아냈습니다. 이제 당신은 진정한 그리핀도르 마법사입니다!",
  },
  {
    id: "escape-hp2",
    bookId: "hp-2",
    title: "비밀의 방 탐험",
    description: "호그와트 학교에 숨겨진 비밀의 방을 찾아 괴물을 물리치세요!",
    puzzles: hp2Puzzles,
    completionMessage:
      "축하합니다! 비밀의 방의 괴물 바실리스크를 물리치고 호그와트를 구했습니다!",
  },
];

// 방탈출 방 가져오기 함수
export const getEscapeRooms = (): EscapeRoom[] => {
  return escapeRooms;
};

export const getEscapeRoomById = (id: string): EscapeRoom | undefined => {
  return escapeRooms.find((room) => room.id === id);
};

export const getEscapeRoomByBookId = (
  bookId: string
): EscapeRoom | undefined => {
  return escapeRooms.find((room) => room.bookId === bookId);
};

export const getPuzzleById = (puzzleId: string): Puzzle | undefined => {
  for (const room of escapeRooms) {
    const puzzle = room.puzzles.find((puzzle) => puzzle.id === puzzleId);
    if (puzzle) return puzzle;
  }
  return undefined;
};
