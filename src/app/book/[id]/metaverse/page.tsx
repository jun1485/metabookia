import Link from "next/link";
import { ArrowLeft, Book } from "lucide-react";
import { getBookById } from "@/app/data/books";
import { getMetaverseRoomByBookId } from "@/app/data/metaverse-rooms";
import ClientMetaverseSpace from "./ClientMetaverseSpace";

export default function BookMetaversePage({
  params,
}: {
  params: { id: string };
}) {
  const bookId = params.id;

  // 책과 메타버스 룸 정보 가져오기
  const book = getBookById(bookId);
  const metaverseRoom = getMetaverseRoomByBookId(bookId);

  // 책이 없는 경우
  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-light-100 to-light-200 dark:from-dark-300 dark:to-dark-400 p-4">
        <div className="bg-white dark:bg-dark-200 rounded-xl p-8 shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            책을 찾을 수 없습니다.
          </h2>
          <Link
            href={`/book/${bookId}`}
            className="inline-flex items-center gap-2 mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            <ArrowLeft size={18} />
            <span>책 상세 페이지로 돌아가기</span>
          </Link>
        </div>
      </div>
    );
  }

  // 메타버스 룸이 없는 경우
  if (!metaverseRoom) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-light-100 to-light-200 dark:from-dark-300 dark:to-dark-400 p-4">
        <div className="bg-white dark:bg-dark-200 rounded-xl p-8 shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            이 책의 메타버스 공간이 아직 준비되지 않았습니다.
          </h2>
          <Link
            href={`/book/${bookId}`}
            className="inline-flex items-center gap-2 mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            <ArrowLeft size={18} />
            <span>책 상세 페이지로 돌아가기</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-100 to-light-200 dark:from-dark-300 dark:to-dark-400 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            href={`/book/${bookId}`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-all hover:translate-x-[-4px] font-medium"
          >
            <ArrowLeft size={18} />
            <span>책 상세 페이지로 돌아가기</span>
          </Link>

          <div className="flex items-center gap-2 bg-white dark:bg-dark-200 py-2 px-4 rounded-full shadow-sm">
            <Book
              size={18}
              className="text-primary-600 dark:text-primary-400"
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {book?.title}
            </span>
          </div>
        </div>

        {/* 메타버스 공간 컴포넌트 */}
        <ClientMetaverseSpace
          roomId={metaverseRoom.id}
          roomData={metaverseRoom}
          bookTitle={book.title}
        />
      </div>
    </div>
  );
}
