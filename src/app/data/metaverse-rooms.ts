// 메타버스 룸 타입 정의
export interface MetaverseRoom {
  id: string;
  bookId: string;
  name: string;
  description: string;
  backgroundImage: string;
  interactiveObjects: InteractiveObject[];
  npcs?: NPC[];
}

// 상호작용 데이터 타입 정의
type DialogData = { text: string };
type CollectData = { itemId: string; message: string };
type TeleportData = { destinationId: string };
type PuzzleData = { puzzleId: string; question: string; answers: string[] };

// 상호작용 타입에 따른 유니온 타입
type InteractionData = DialogData | CollectData | TeleportData | PuzzleData;

// 상호작용 가능한 오브젝트 인터페이스
interface InteractiveObject {
  id: string;
  type: "item" | "portal" | "puzzle" | "info";
  name: string;
  description: string;
  position: { x: number; y: number; z?: number };
  interaction?: {
    type: "dialog" | "collect" | "teleport" | "puzzle";
    data: InteractionData;
  };
}

// NPC 인터페이스
interface NPC {
  id: string;
  name: string;
  avatar: string;
  position: { x: number; y: number; z?: number };
  dialog: {
    greeting: string;
    conversations: {
      id: string;
      text: string;
      responses?: {
        id: string;
        text: string;
        next?: string;
      }[];
    }[];
  };
}

// 샘플 메타버스 룸 데이터
const metaverseRooms: MetaverseRoom[] = [
  {
    id: "meta-room-1",
    bookId: "book-1",
    name: "해리 포터의 호그와트 기숙사",
    description:
      "호그와트 마법학교의 그리핀도르 기숙사에 오신 것을 환영합니다. 이곳에서 마법의 세계를 탐험해보세요.",
    backgroundImage: "/images/rooms/hogwarts-common-room.jpg",
    interactiveObjects: [
      {
        id: "obj-1",
        type: "info",
        name: "마법 책장",
        description: "다양한 마법 서적이 꽂혀 있는 책장입니다.",
        position: { x: 20, y: 40 },
        interaction: {
          type: "dialog",
          data: {
            text: "마법의 역사, 어둠의 마법 방어술, 마법약 제조법 등 다양한 책들이 있습니다.",
          },
        },
      },
      {
        id: "obj-2",
        type: "portal",
        name: "초상화 입구",
        description: "다른 공간으로 이동할 수 있는 초상화입니다.",
        position: { x: 80, y: 30 },
        interaction: {
          type: "teleport",
          data: {
            destinationId: "meta-room-2",
          },
        },
      },
    ],
  },
  {
    id: "meta-room-2",
    bookId: "book-2",
    name: "반지의 제왕: 중간계",
    description:
      "반지의 제왕 세계의 중간계에 오신 것을 환영합니다. 이곳에서 모험을 시작해보세요.",
    backgroundImage: "/images/rooms/middle-earth.jpg",
    interactiveObjects: [
      {
        id: "obj-1",
        type: "item",
        name: "신비한 반지",
        description: "어둠 속에서 빛나는 신비한 반지입니다.",
        position: { x: 50, y: 60 },
        interaction: {
          type: "collect",
          data: {
            itemId: "ring-of-power",
            message: "모든 반지를 다스리는 하나의 반지를 획득했습니다!",
          },
        },
      },
    ],
    npcs: [
      {
        id: "npc-1",
        name: "간달프",
        avatar: "/images/avatars/gandalf.png",
        position: { x: 30, y: 40 },
        dialog: {
          greeting: "어서 오게, 젊은 여행자여. 무엇을 도와드릴까?",
          conversations: [
            {
              id: "conv-1",
              text: "이 세계에 대해 알려주세요.",
              responses: [
                {
                  id: "resp-1",
                  text: "중간계는 많은 종족이 살고 있는 위험하고도 아름다운 세계라네. 조심하게.",
                  next: "conv-2",
                },
              ],
            },
            {
              id: "conv-2",
              text: "반지에 대해 알려주세요.",
              responses: [
                {
                  id: "resp-2",
                  text: "그 반지는 위험하다네. 모든 것을 지배하려는 어둠의 힘이 깃들어 있지.",
                },
              ],
            },
          ],
        },
      },
    ],
  },
];

/**
 * 책 ID로 메타버스 룸 정보를 조회합니다.
 * @param bookId 조회할 책의 ID
 * @returns 해당 책 ID에 연결된 메타버스 룸 정보
 */
export const getMetaverseRoomByBookId = (
  bookId: string,
): MetaverseRoom | undefined => {
  return metaverseRooms.find((room) => room.bookId === bookId);
};

/**
 * 메타버스 룸 ID로 메타버스 룸 정보를 조회합니다.
 * @param roomId 조회할 메타버스 룸의 ID
 * @returns 해당 ID의 메타버스 룸 정보
 */
export const getMetaverseRoomById = (
  roomId: string,
): MetaverseRoom | undefined => {
  return metaverseRooms.find((room) => room.id === roomId);
};

/**
 * 모든 메타버스 룸 정보를 반환합니다.
 * @returns 전체 메타버스 룸 배열
 */
export const getAllMetaverseRooms = (): MetaverseRoom[] => {
  return metaverseRooms;
};
