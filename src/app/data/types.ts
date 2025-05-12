export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  series?: string;
  publishedYear?: number;
}

export interface Chapter {
  id: string;
  bookId: string;
  title: string;
  content: string;
}

export interface BookSeries {
  id: string;
  name: string;
  books: Book[];
}

// 방탈출 수수께끼 관련 타입
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

export interface UserProgress {
  userId: string;
  escapeRoomId: string;
  completedPuzzles: string[];
  currentPuzzleId: string;
  startTime: number;
  endTime?: number;
}
