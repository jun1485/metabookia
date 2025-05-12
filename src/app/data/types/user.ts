export interface UserProgress {
  userId: string;
  escapeRoomId: string;
  completedPuzzles: string[];
  currentPuzzleId: string;
  startTime: number;
  endTime?: number;
}
