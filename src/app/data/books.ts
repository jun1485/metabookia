import { Book, BookSeries } from "./types";

export const harryPotterBooks: Book[] = [
  {
    id: "hp-1",
    title: "해리 포터와 마법사의 돌",
    author: "J.K. 롤링",
    description:
      "11살 소년 해리 포터가 마법사임을 알게 되고 호그와트 마법학교에서 일어나는 첫 번째 모험을 담은 이야기입니다.",
    coverImage: "/images/harry-potter-1.jpg",
    series: "harryPotter",
    publishedYear: 1997,
  },
  {
    id: "hp-2",
    title: "해리 포터와 비밀의 방",
    author: "J.K. 롤링",
    description:
      "호그와트 2학년인 해리가 학교에서 일어나는 괴이한 사건을 조사하며 비밀의 방을 찾아가는 이야기입니다.",
    coverImage: "/images/harry-potter-2.jpg",
    series: "harryPotter",
    publishedYear: 1998,
  },
  {
    id: "hp-3",
    title: "해리 포터와 아즈카반의 죄수",
    author: "J.K. 롤링",
    description:
      "아즈카반 감옥에서 탈출한 죄수 시리우스 블랙과 관련된 해리의 과거가 밝혀지는 이야기입니다.",
    coverImage: "/images/harry-potter-3.jpg",
    series: "harryPotter",
    publishedYear: 1999,
  },
  {
    id: "hp-4",
    title: "해리 포터와 불의 잔",
    author: "J.K. 롤링",
    description:
      "트라이위저드 토너먼트에 참가하게 된 해리가 어둠의 마왕 볼드모트의 부활 계획에 맞서는 이야기입니다.",
    coverImage: "/images/harry-potter-4.jpg",
    series: "harryPotter",
    publishedYear: 2000,
  },
  {
    id: "hp-5",
    title: "해리 포터와 불사조 기사단",
    author: "J.K. 롤링",
    description:
      "볼드모트의 귀환을 부정하는 마법부에 맞서 해리와 불사조 기사단이 비밀리에 대항하는 이야기입니다.",
    coverImage: "/images/harry-potter-5.jpg",
    series: "harryPotter",
    publishedYear: 2003,
  },
  {
    id: "hp-6",
    title: "해리 포터와 혼혈왕자",
    author: "J.K. 롤링",
    description:
      "볼드모트의 과거와 그의 약점을 알아가는 해리의 이야기와 스네이프 교수의 비밀이 드러나는 이야기입니다.",
    coverImage: "/images/harry-potter-6.jpg",
    series: "harryPotter",
    publishedYear: 2005,
  },
  {
    id: "hp-7",
    title: "해리 포터와 죽음의 성물",
    author: "J.K. 롤링",
    description:
      "호크룩스를 찾아 볼드모트를 물리치기 위한 해리의 마지막 여정을 담은 이야기입니다.",
    coverImage: "/images/harry-potter-7.jpg",
    series: "harryPotter",
    publishedYear: 2007,
  },
];

export const bookSeries: BookSeries[] = [
  {
    id: "harryPotter",
    name: "해리 포터 시리즈",
    books: harryPotterBooks,
  },
];

export const getAllSeries = (): BookSeries[] => {
  return bookSeries;
};

export const getSeriesById = (id: string): BookSeries | undefined => {
  return bookSeries.find((series) => series.id === id);
};

export const getBookById = (id: string): Book | undefined => {
  for (const series of bookSeries) {
    const book = series.books.find((book) => book.id === id);
    if (book) return book;
  }
  return undefined;
};

// 모든 책을 반환하는 함수
export const getAllBooks = (): Book[] => {
  let allBooks: Book[] = [];
  for (const series of bookSeries) {
    allBooks = [...allBooks, ...series.books];
  }
  return allBooks;
};
