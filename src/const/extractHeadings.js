export const extractHeadings = (content) => {
    const headingRegex = /^(#{2,6})\s+(.+)$/gm; // h2부터 h6까지 찾기
    let match;
    const headings = [];

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length; // ## -> 2, ### -> 3
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/\s+/g, "-"); // 공백을 "-"로 변환

        headings.push({ level, text, id });
    }

    return headings;
};
