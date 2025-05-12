"use client";

import { Book } from "../data/types/book";
import Link from "next/link";
import { motion } from "framer-motion";
import BookCover from "./BookCover";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
      }}
      className="card card-hover"
    >
      <Link href={`/book/${book.id}`} className="block">
        <div className="relative h-64 w-full bg-light-400 dark:bg-dark-300 flex items-center justify-center">
          {/* BookCover 컴포넌트 사용 */}
          <BookCover
            title={book.title}
            author={book.author}
            defaultCoverImage={book.coverImage}
            width={150}
            height={200}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {book.author}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {book.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
