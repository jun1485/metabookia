import { getBookById, getAllBooks } from "@/app/data/books";
import { getEscapeRoomByBookId } from "@/app/data/escape-rooms";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookCover from "@/app/components/BookCover";

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
    <div className="min-h-screen bg-light-200 dark:bg-dark-300 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          ← 메인 페이지로 돌아가기
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* 책 표지 이미지 - BookCover 컴포넌트로 변경 */}
          <div className="bg-light-300 dark:bg-dark-200 rounded-lg flex flex-col items-center justify-center p-6 shadow-md">
            <BookCover
              title={book.title}
              author={book.author}
              defaultCoverImage={book.coverImage}
              width={200}
              height={300}
            />
          </div>

          {/* 책 정보 */}
          <div className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              {book.title}
            </h1>
            <p className="text-xl text-primary-600 dark:text-primary-400 mb-4">
              {book.author}
            </p>
            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                {book.description}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                출판년도: {book.publishedYear}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-secondary">읽기 시작하기</button>

              {escapeRoom && (
                <Link
                  href={`/escape-room/${escapeRoom.id}`}
                  className="btn-primary text-center"
                >
                  메타버스 방탈출 도전하기
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 메타버스 북클럽 소개 */}
        {escapeRoom && (
          <div className="mt-12 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/40 dark:to-secondary-900/40 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-primary-700 dark:text-primary-400">
              메타버스 북클럽
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {book.title} 세계 속으로 직접 들어가 수수께끼를 풀어보세요!
              호그와트의 마법사가 되어 특별한 방탈출 게임에 도전할 수 있습니다.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="bg-white dark:bg-dark-200 p-4 rounded-lg shadow-md flex-1">
                <h3 className="font-bold mb-2 text-secondary-700 dark:text-secondary-400">
                  {escapeRoom.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {escapeRoom.description}
                </p>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  난이도: 중간
                </p>
              </div>
              <Link
                href={`/escape-room/${escapeRoom.id}`}
                className="btn-primary whitespace-nowrap"
              >
                지금 입장하기
              </Link>
            </div>
          </div>
        )}

        {/* 책 내용 미리보기 (챕터 정보가 있다면 여기에 표시) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-secondary-700 dark:text-secondary-400">
            책 미리보기
          </h2>
          <div className="bg-light-300 dark:bg-dark-200 p-6 rounded-lg shadow-md">
            <p className="italic text-gray-700 dark:text-gray-300">
              이 책의 내용 미리보기는 아직 준비되지 않았습니다. 곧 업데이트될
              예정입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
