export interface Puzzle {
  id: string;
  content: string;
  correctPosition: number;
}

export interface PuzzleSet {
  id: string;
  title: string;
  description: string;
  puzzleItems: Puzzle[];
  reward?: string;
}

export interface PuzzleItemProps {
  id: string;
  content: string;
}

export type PuzzleSolvedCallback = () => void;
