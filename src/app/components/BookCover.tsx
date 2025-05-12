"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BookCoverApiResponse } from "../data/types/api";

interface BookCoverProps {
  title: string;
  author: string;
  defaultCoverImage?: string;
  width?: number;
  height?: number;
}

export default function BookCover({
  title,
  author,
  defaultCoverImage,
  width = 192,
  height = 256,
}: BookCoverProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(
    defaultCoverImage || null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookCover = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 기본 이미지가 있으면 바로 사용
        if (defaultCoverImage) {
          setCoverUrl(defaultCoverImage);
          setIsLoading(false);
          return;
        }

        // API를 통해 책 표지 가져오기
        const response = await fetch(
          `/api/book-cover?title=${encodeURIComponent(
            title
          )}&author=${encodeURIComponent(author)}`
        );

        const data: BookCoverApiResponse = await response.json();

        if (data.success && data.coverUrl) {
          setCoverUrl(data.coverUrl);
        } else {
          setError(data.message || "책 표지를 가져오는데 실패했습니다");
        }
      } catch (err) {
        console.error("책 표지 로딩 오류:", err);
        setError("책 표지를 불러오는 중 문제가 발생했습니다");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookCover();
  }, [title, author, defaultCoverImage]);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"
        style={{ width, height }}
      >
        <span className="text-gray-400">로딩 중...</span>
      </div>
    );
  }

  if (error || !coverUrl) {
    return (
      <div
        className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
        style={{ width, height }}
      >
        <span className="text-5xl mb-2">📚</span>
        <span className="text-xs text-center text-gray-500 dark:text-gray-400 px-2">
          {error || "이미지를 찾을 수 없습니다"}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-md overflow-hidden shadow-md"
      style={{ width, height }}
    >
      <Image
        src={coverUrl}
        alt={`${title} 책 표지`}
        fill
        sizes={`(max-width: 768px) 100vw, ${width}px`}
        className="object-cover"
        onError={() => {
          setError("이미지 로딩 실패");
          setCoverUrl(null);
        }}
      />
    </div>
  );
}
