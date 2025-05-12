import { NextRequest, NextResponse } from "next/server";
import { BookCoverApiResponse } from "@/app/data/types/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  const author = searchParams.get("author");

  if (!title) {
    return NextResponse.json<BookCoverApiResponse>(
      {
        success: false,
        message: "책 제목은 필수입니다",
      },
      { status: 400 }
    );
  }

  try {
    // OpenLibrary API를 통해 책 정보 가져오기
    const query = `${title}${author ? ` ${author}` : ""}`;
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodedQuery}&limit=1`
    );

    if (!response.ok) {
      throw new Error("책 정보를 가져오는데 실패했습니다");
    }

    const data = await response.json();

    if (!data.docs || data.docs.length === 0) {
      return NextResponse.json<BookCoverApiResponse>(
        {
          success: false,
          message: "해당 책을 찾을 수 없습니다",
        },
        { status: 404 }
      );
    }

    const book = data.docs[0];
    const coverId = book.cover_i;

    if (!coverId) {
      return NextResponse.json<BookCoverApiResponse>(
        {
          success: false,
          message: "책 표지 이미지를 찾을 수 없습니다",
        },
        { status: 404 }
      );
    }

    // OpenLibrary 표지 URL 구성
    const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;

    return NextResponse.json<BookCoverApiResponse>({
      success: true,
      coverUrl,
    });
  } catch (error) {
    console.error("책 표지 가져오기 실패:", error);
    return NextResponse.json<BookCoverApiResponse>(
      {
        success: false,
        message: "책 표지를 가져오는 중 오류가 발생했습니다",
      },
      { status: 500 }
    );
  }
}
