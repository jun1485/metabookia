export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  series?: string;
  publishedYear?: number;
}

export interface Chapter {
  id: string;
  bookId: string;
  title: string;
  content: string;
}

export interface BookSeries {
  id: string;
  name: string;
  books: Book[];
}
