const fs = require("fs");
const path = require("path");

// ✅ 절대 경로로 수정 (사용자의 실제 파일 위치)
const ID_FILE_PATH = "C:/Users/Jaero0/Desktop/ProgStudy/my-react-blog/src/posts/data/id.json";

async function getNextId() {
    let lastId = 0;

    // id.json 파일이 존재하는지 확인
    if (fs.existsSync(ID_FILE_PATH)) {
        try {
            const content = fs.readFileSync(ID_FILE_PATH, "utf8");
            const jsonData = JSON.parse(content);
            lastId = jsonData.id || 0;
        } catch (e) {
            console.error("JSON 파싱 오류:", e);
        }
    }

    // 새로운 ID 생성
    const newId = lastId + 1;

    // JSON 파일 업데이트
    const newJsonContent = JSON.stringify({ id: newId }, null, 2);
    fs.writeFileSync(ID_FILE_PATH, newJsonContent, "utf8");

    return newId;
}

module.exports = getNextId;
