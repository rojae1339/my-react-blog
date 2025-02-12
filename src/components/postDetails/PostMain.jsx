import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
/*https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/*/
/*https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD*/
import {pojoaque} from "react-syntax-highlighter/dist/esm/styles/prism";


const PostMain = ({content}) => {


    return (
        <main>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code({className, children}) {
                        const match = /language-(\w+)/.exec(className || "");
                        const isInline = !className;

                        console.log(!isInline && Boolean(match));

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
                }}
            >
                {content}
            </ReactMarkdown>
        </main>
    )
}

export default PostMain