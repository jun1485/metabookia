"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MetaverseRoom } from "@/app/data/metaverse-rooms";

interface MetaverseSpaceProps {
  roomData: MetaverseRoom;
}

export default function MetaverseSpace({ roomData }: MetaverseSpaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [dialogContent, setDialogContent] = useState<string | null>(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 80 });

  // 오브젝트 선택 핸들러
  const handleObjectClick = (objectId: string) => {
    const object = roomData.interactiveObjects.find(
      (obj) => obj.id === objectId,
    );
    if (!object) return;

    setSelectedObject(objectId);

    // 상호작용 타입에 따른 처리
    if (object.interaction) {
      if (object.interaction.type === "dialog") {
        const dialogData = object.interaction.data as { text: string };
        setDialogContent(dialogData.text);
      } else if (object.interaction.type === "teleport") {
        // 텔레포트 로직 구현 (예시)
        alert(`다른 공간으로 이동합니다: ${object.name}`);
      } else if (object.interaction.type === "collect") {
        const collectData = object.interaction.data as {
          itemId: string;
          message: string;
        };
        alert(collectData.message);
      }
    }
  };

  // 다이얼로그 닫기
  const closeDialog = () => {
    setDialogContent(null);
    setSelectedObject(null);
  };

  // 플레이어 이동 처리
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || dialogContent) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // 이동 애니메이션 트리거
    setPlayerPosition({ x, y });
  };

  // NPC와의 대화 시작
  const startNpcConversation = (npcId: string) => {
    const npc = roomData.npcs?.find((n) => n.id === npcId);
    if (!npc) return;

    setDialogContent(npc.dialog.greeting);
  };

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-lg">
      {/* 메타버스 배경 */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className="absolute inset-0 w-full h-full cursor-pointer"
        style={{
          backgroundImage: `url(${roomData.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 룸 이름 표시 */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg">
          <h2 className="text-lg font-medium">{roomData.name}</h2>
        </div>

        {/* 상호작용 가능한 오브젝트들 */}
        {roomData.interactiveObjects.map((object) => (
          <motion.div
            key={object.id}
            className={`absolute cursor-pointer p-2 rounded-full ${
              selectedObject === object.id
                ? "bg-primary-500/50"
                : "bg-white/30 hover:bg-white/50"
            }`}
            style={{
              left: `${object.position.x}%`,
              top: `${object.position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleObjectClick(object.id)}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {object.type === "portal" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-primary-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              )}
              {object.type === "item" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-secondary-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                  />
                </svg>
              )}
              {object.type === "info" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-info-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {object.type === "puzzle" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-warning-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              )}
            </div>
            {/* 툴팁 */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/70 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
              {object.name}
            </div>
          </motion.div>
        ))}

        {/* NPC 캐릭터들 */}
        {roomData.npcs?.map((npc) => (
          <motion.div
            key={npc.id}
            className="absolute cursor-pointer"
            style={{
              left: `${npc.position.x}%`,
              top: `${npc.position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => startNpcConversation(npc.id)}
          >
            <div className="w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-primary-500">
              <img
                src={npc.avatar}
                alt={npc.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1 bg-black/50 text-white text-xs py-0.5 px-2 rounded text-center">
              {npc.name}
            </div>
          </motion.div>
        ))}

        {/* 플레이어 캐릭터 */}
        <motion.div
          className="absolute w-10 h-10 bg-primary-500 rounded-full border-2 border-white shadow-lg z-10"
          style={{
            x: `calc(${playerPosition.x}% - 20px)`,
            y: `calc(${playerPosition.y}% - 20px)`,
          }}
          animate={{
            x: `calc(${playerPosition.x}% - 20px)`,
            y: `calc(${playerPosition.y}% - 20px)`,
          }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="w-full h-full flex items-center justify-center text-white font-bold">
            ME
          </div>
        </motion.div>

        {/* 다이얼로그 창 */}
        {dialogContent && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 max-w-2xl bg-black/80 text-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="mb-2 flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {selectedObject
                  ? roomData.interactiveObjects.find(
                      (obj) => obj.id === selectedObject,
                    )?.name
                  : "정보"}
              </h3>
              <button
                onClick={closeDialog}
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p>{dialogContent}</p>
          </motion.div>
        )}
      </div>

      {/* 메타버스 공간 설명 */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded-lg max-w-xs">
        <p className="text-sm">{roomData.description}</p>
      </div>

      {/* 컨트롤 패널 */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="bg-primary-600 hover:bg-primary-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
