// 방탈출 수수께끼 관련 타입 정의
export interface Puzzle {
  id: string;
  bookId: string;
  title: string;
  description: string;
  question: string;
  hints: string[];
  answer: string;
  nextPuzzleId?: string;
}

export interface EscapeRoom {
  id: string;
  bookId: string;
  title: string;
  description: string;
  puzzles: Puzzle[];
  completionMessage: string;
}
