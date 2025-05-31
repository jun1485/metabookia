import { getBookById, getAllBooks } from "@/app/data/books";
import { getEscapeRoomByBookId } from "@/app/data/escape-rooms";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookCover from "@/app/components/BookCover";
import { ArrowLeft, BookOpen, MapPin } from "lucide-react";
import { Book } from "@/app/data/types/book";

export async function generateStaticParams() {
  const books = getAllBooks();
  return books.map((book) => ({
    id: book.id,
  }));
}

export default function BookPage({ params }: { params: { id: string } }) {
  const book = getBookById(params.id);
  const escapeRoom = getEscapeRoomByBookId(params.id);

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-100 to-light-200 dark:from-dark-300 dark:to-dark-400 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-all hover:translate-x-[-4px] font-medium"
        >
          <ArrowLeft size={18} />
          <span>메인 페이지로 돌아가기</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 mb-12">
          {/* 책 표지 이미지 */}
          <div className="bg-white dark:bg-dark-200 rounded-xl flex flex-col items-center justify-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
            <div className="relative transform hover:scale-105 transition-transform duration-300">
              <BookCover
                title={book.title}
                author={book.author}
                defaultCoverImage={book.coverImage}
                width={220}
                height={330}
              />
              <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white dark:bg-primary-500 rounded-full w-12 h-12 flex items-center justify-center shadow-md transform rotate-12">
                <span className="text-xs font-bold">NEW</span>
              </div>
            </div>
          </div>

          {/* 책 정보 */}
          <div className="bg-white dark:bg-dark-100 p-8 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-800 dark:text-gray-100 leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-primary-600 dark:text-primary-400 mb-6 font-medium">
              {book.author}
            </p>
            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 my-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {book.description}
              </p>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="inline-block bg-light-300 dark:bg-dark-300 px-3 py-1 rounded-full text-sm">
                  출판년도: {book.publishedYear}
                </span>
                <span className="inline-block bg-light-300 dark:bg-dark-300 px-3 py-1 rounded-full text-sm">
                  페이지: {(book as Book & { pages?: number }).pages || "미정"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-secondary flex items-center justify-center gap-2 py-3 px-6 hover:shadow-md transition-shadow">
                <BookOpen size={18} />
                <span>읽기 시작하기</span>
              </button>

              <Link
                href={`/book/${book.id}/metaverse`}
                className="btn-primary text-center flex items-center justify-center gap-2 py-3 px-6 hover:shadow-md transition-all hover:translate-y-[-2px]"
              >
                <MapPin size={18} />
                <span>메타버스 공간 입장하기</span>
              </Link>

              {escapeRoom && (
                <Link
                  href={`/escape-room/${escapeRoom.id}`}
                  className="btn-secondary text-center flex items-center justify-center gap-2 py-3 px-6 hover:shadow-md transition-all hover:translate-y-[-2px]"
                >
                  <MapPin size={18} />
                  <span>방탈출 도전하기</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 메타버스 북클럽 소개 */}
        {escapeRoom && (
          <div className="mt-12 mb-12 bg-gradient-to-r from-primary-100/80 to-secondary-100/80 dark:from-primary-900/40 dark:to-secondary-900/40 p-8 rounded-xl shadow-lg backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 dark:bg-primary-800/20 rounded-full blur-3xl -mr-32 -mt-32 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-200 dark:bg-secondary-800/20 rounded-full blur-3xl -ml-32 -mb-32 opacity-70"></div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-700 dark:text-primary-400">
                메타버스 북클럽
              </h2>
              <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                <span className="font-semibold">{book.title}</span> 세계 속으로
                직접 들어가 수수께끼를 풀어보세요! 호그와트의 마법사가 되어
                특별한 방탈출 게임에 도전할 수 있습니다.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-white/90 dark:bg-dark-200/90 p-6 rounded-xl shadow-md flex-1 border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
                  <h3 className="font-bold text-xl mb-3 text-secondary-700 dark:text-secondary-400">
                    {escapeRoom.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {escapeRoom.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 py-1 px-3 rounded-full">
                      난이도: 중간
                    </span>
                    <span className="text-xs bg-secondary-100 dark:bg-secondary-900/40 text-secondary-700 dark:text-secondary-400 py-1 px-3 rounded-full">
                      소요시간: 60분
                    </span>
                  </div>
                </div>
                <Link
                  href={`/escape-room/${escapeRoom.id}`}
                  className="btn-primary whitespace-nowrap py-3 px-6 hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  <MapPin size={18} />
                  <span>지금 입장하기</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 책 내용 미리보기 */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-secondary-700 dark:text-secondary-400 flex items-center gap-2">
            <BookOpen size={24} />
            <span>책 미리보기</span>
          </h2>
          <div className="bg-white dark:bg-dark-200 p-8 rounded-xl shadow-md backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-100 dark:border-gray-800">
            {book.preview ? (
              <div className="prose dark:prose-invert max-w-none">
                {book.preview}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="italic text-gray-700 dark:text-gray-300 text-center mb-4">
                  이 책의 내용 미리보기는 아직 준비되지 않았습니다. 곧
                  업데이트될 예정입니다.
                </p>
                <div className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-primary-500 dark:bg-primary-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
