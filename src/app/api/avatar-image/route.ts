import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "파일이 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    // 파일 확장자 추출
    const fileExt = file.name.split(".").pop()?.toLowerCase();

    // 허용된 이미지 확장자 확인
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    if (!fileExt || !allowedExtensions.includes(fileExt)) {
      return NextResponse.json(
        { success: false, message: "지원되지 않는 파일 형식입니다." },
        { status: 400 }
      );
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: "파일 크기는 5MB를 초과할 수 없습니다." },
        { status: 400 }
      );
    }

    // 임의의 파일명 생성
    const uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    const fileName = `avatar-${uniqueId}.${fileExt}`;

    // 프로젝트 루트 디렉토리 기준 public 폴더 경로
    const publicDir = join(process.cwd(), "public");
    const uploadsDir = join(publicDir, "uploads", "avatars");

    try {
      // 파일 읽기
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // 파일 저장 경로
      const filePath = join(uploadsDir, fileName);

      // 파일 저장
      await writeFile(filePath, buffer);

      // 브라우저에서 접근 가능한 URL 경로 생성
      const fileUrl = `/uploads/avatars/${fileName}`;

      return NextResponse.json({
        success: true,
        fileUrl,
        message: "이미지가 성공적으로 업로드되었습니다.",
      });
    } catch (error) {
      console.error("파일 저장 오류:", error);
      return NextResponse.json(
        { success: false, message: "파일 저장 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("요청 처리 오류:", error);
    return NextResponse.json(
      { success: false, message: "요청 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
