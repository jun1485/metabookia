"use client";

import { useState, useEffect } from "react";
import MetaverseSpace from "@/app/components/MetaverseSpace";
import { MetaverseRoom } from "@/app/data/metaverse-rooms";

interface ClientMetaverseSpaceProps {
  roomId: string;
  roomData: MetaverseRoom;
  bookTitle?: string;
}

export default function ClientMetaverseSpace({
  roomId,
  roomData,
  bookTitle,
}: ClientMetaverseSpaceProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 클라이언트 사이드에서 초기화 작업
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 dark:border-primary-400 mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {bookTitle
              ? `"${bookTitle}" 메타버스 공간을 로딩 중입니다...`
              : "메타버스 공간을 로딩 중입니다..."}
          </p>
        </div>
      </div>
    );
  }

  return <MetaverseSpace roomId={roomId} roomData={roomData} />;
}
