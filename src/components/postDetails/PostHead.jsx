import {useState, useEffect} from "react";
import {JsonKeys} from "../../const/consts.js";

const avgReadingSpeed = 170;

const calculateReadingTime = (text) => {
    const wordsPerMinute = avgReadingSpeed; // 평균 읽기 속도 (분당 200단어)
    const secondsPerWord = 60 / wordsPerMinute; // 단어당 걸리는 초 계산
    const wordCount = text.split(/\s+/).length; // 단어 개수 세기
    const totalSeconds = Math.ceil(wordCount * secondsPerWord); // 전체 걸리는 시간(초 단위)

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return {minutes, seconds};
};

const PostHead = ({frontmatter, content}) => {
    const title = frontmatter[JsonKeys.TITLE];
    const subTitle = frontmatter[JsonKeys.SUB_TITLE];
    const date = frontmatter[JsonKeys.DATE];

    const [readingTime, setReadingTime] = useState({minutes: 0, seconds: 0});

    useEffect(() => {
        if (content) {
            setReadingTime(calculateReadingTime(content));
        }
    }, [content]);

    return (
        <header className="border-b-[1px] pb-6 border-gray-300 flex flex-col gap-1 w-full">
            <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[35px] font-bold text-gray-900 break-keep">
                {title}
            </h1>
            <span className="text-[18px] font-bold text-gray-700">
                {subTitle}
            </span>
            <div className="pt-1 text-[14px] text-gray-600 flex flex-wrap justify-between">
                <div>
                    {date}
                </div>
                <div className="flex gap-4 text-gray-400">
                    <div>분당 {avgReadingSpeed}단어</div>
                    <div>📖 {readingTime.minutes}분 {readingTime.seconds}초</div>
                </div>
            </div>
        </header>
    );
};


export default PostHead;
