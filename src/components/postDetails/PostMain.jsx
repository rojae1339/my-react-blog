import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
/*https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/*/
/*https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD*/
import {pojoaque} from "react-syntax-highlighter/dist/esm/styles/prism";
import {usePosts} from "../hooks/usePosts.js";


const PostMain = ({content}) => {

    return (
        <main className={"pt-7"}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code({className, children}) {
                        const match = /language-(\w+)/.exec(className || "");
                        const isInline = !className;

                        return (!isInline && Boolean(match)) ? (
                            <SyntaxHighlighter
                                language={match[1]}
                                PreTag="pre"
                                style={pojoaque}

                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ): (
                            <code>
                                {children}
                            </code>
                        );
                    },
                    p: ({children}) => {
                        return (
                            <p className={"py-1"}>
                                {children}
                            </p>
                        )
                    },
                    h2: ({children}) => {
                        const id = String(children).toLowerCase().replace(/\s+/g, "-");
                        return (
                            <h2 id={id} className={"text-[38px] pb-2 font-semibold"}>
                                {children}
                            </h2>
                        )

                        //아래부터 todo
                    },
                    h3:({children}) => {
                        const id = String(children).toLowerCase().replace(/\s+/g, "-");
                        return (
                            <h3 id={id} className={"text-[32px] pb-2 font-semibold"}>
                                {children}
                            </h3>
                        )
                    },
                    h4:({node, children}) => {
                        const id = String(children).toLowerCase().replace(/\s+/g, "-");
                        return (
                            <h4 id={id} className={"text-[26px] pb-2 font-semibold"}>
                                {children}
                            </h4>
                        )
                    },
                    h5:({node, children}) => {
                        const id = String(children).toLowerCase().replace(/\s+/g, "-");
                        return (
                            <h5 id={id} className={"text-[22px] pb-2 font-semibold"}>
                                {children}
                            </h5>
                        )
                    },
                    h6:({node, children}) => {
                        const id = String(children).toLowerCase().replace(/\s+/g, "-");
                        return (
                            <h6 id={id} className={"text-[18px] pb-2 font-semibold"}>
                                {children}
                            </h6>
                        )
                    },
                    ul: ({children}) => {
                        return (
                            <ul className={"pt-1 pl-4 pb-2 text-gray-500 italic"}>
                                {children}
                            </ul>
                        )
                    },
                    li: ({children}) => {
                        return (
                            <li className={"pt-2"}>
                                {children}
                            </li>
                        )
                    },
                    ol: ({children}) => {
                        return (
                            <ol className={"pt-1 pl-8 pb-2 text-gray-500 italic"}>
                                {children}
                            </ol>
                        )
                    },
                    a: ({children, href}) => {
                        return (
                            <a href={href} target={"_blank"} rel={"noopener noreferrer"}
                               className={"font-semibold text-stone-600 underline whitespace-pre-wrap inline-block break-keep"}
                            >
                                {children}
                            </a>
                        )
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </main>
    )
}

export default PostMain