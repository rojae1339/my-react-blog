export function extractFirstImage(content) {
    // 마크다운 이미지 형식: ![alt](image.jpg)
    const markdownImgRegex = /!\[.*?\]\((.*?)\)/;

    // 정규식 실행
    const match = markdownImgRegex.exec(content);

    // 이미지 경로 반환 (없으면 null)
    return match ? match[0] : null;
}
