export interface OpenLibraryResponse {
  isbn?: string[];
  number_of_pages?: number;
  publishers?: string[];
  title?: string;
  authors?: { name: string }[];
  publish_date?: string;
  covers?: number[];
}

export interface BookCoverApiResponse {
  success: boolean;
  coverUrl?: string;
  message?: string;
}
