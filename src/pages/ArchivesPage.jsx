import {useState, useEffect} from "react";
import {usePosts} from "../components/hooks/usePosts.js";
import {Link} from "react-router-dom";

const ArchivesPage = () => {
    const posts = usePosts();

    // sessionStorage에서 openYears 상태를 불러옴
    const [openYears, setOpenYears] = useState(() => {
        const savedState = sessionStorage.getItem("openYears");
        return savedState ? JSON.parse(savedState) : {};
    });

    useEffect(() => {
        sessionStorage.setItem("openYears", JSON.stringify(openYears));
    }, [openYears]);

    const postsByYear = posts.reduce((acc, post) => {
        const year = new Date(post.frontmatter.date).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(post);
        return acc;
    }, {});

    Object.keys(postsByYear).forEach(year => {
        postsByYear[year].sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
    });

    const toggleYear = (year) => {
        setOpenYears(prev => {
            const newState = {...prev, [year]: !prev[year]};
            sessionStorage.setItem("openYears", JSON.stringify(newState));
            return newState;
        });
    };

    return (
        <div className="my-10 px-2 sm:px-6 md:px-10 pt-4 ">
            <div className="text-xl font-bold pl-10 border-l-[1px] border-gray-300">
                Archives
            </div>

            <div className="pt-7">
                {Object.keys(postsByYear)
                    .sort((a, b) => b - a)
                    .map(year => (
                        <div key={year}>
                            <button
                                onClick={() => toggleYear(year)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:outline-0 font-bold text-sm"
                            >
                                {year} {openYears[year] ? "▼" : "▶"}
                            </button>

                            {openYears[year] && (
                                <ul className="relative border-l-2 border-gray-300 ml-5 pl-4">
                                    {postsByYear[year].map((post) => {
                                        const date = new Date(post.frontmatter.date);
                                        const day = date.getDate();
                                        const month = date.toLocaleString("en-US", {month: "short"});

                                        return (
                                            <li key={`archive_${post.frontmatter.id}`} className="relative flex gap-4 text-xs text-gray-400 pb-4 last:pb-0">
                                                {/* 타임라인 원 표시 */}
                                                <div className="absolute -left-[23px] top-2 w-[8px] h-[8px] bg-gray-500 rounded-full"></div>

                                                <div className="pt-1">
                                                    {day} {month}
                                                </div>
                                                <Link to={`/${post.frontmatter.title}`} className="text-gray-700 text-base">
                                                    {post.frontmatter.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ArchivesPage;
