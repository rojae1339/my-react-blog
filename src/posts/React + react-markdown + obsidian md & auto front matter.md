---
id: 1
title: 리액트로 옵시디언 + 마크다운을 이용한 블로그 만들기
subTitle: React + (react-markdown + react-syntax-highlighter) + (obsidian md & auto fix front matter)
tag: React Obsidian React-Blog 
date: 2025-02-11
---

## 옵시디언 md파일 고유한 번호 붙이기

frontmatter를 자동적용 시키려면 템플릿 기능을 이용하면 된다.
[템플릿 사용법](https://kaminik.tistory.com/entry/%EC%98%B5%EC%8B%9C%EB%94%94%EC%96%B8%EC%9D%98-%EA%B8%B0%EC%B4%88-9-%ED%85%9C%ED%94%8C%EB%A6%BFtemplates)

여기서 문제가 있다.

나중에 블로그에서 사용할 md파일인데, 각 md파일마다 고유한 id값이 필요하다고 생각이 되어,
DB에서처럼 auto increment가 되는 고유한 id를 각 md파일이 가질수 있는 방법을 찾아보았다.

Templater라는 플러그인으로 js코드를 이용해, 각종 자동화 처리를 할수있다고 하여 이 방법을 사용하기로 했다.

먼저 필요한건

> test blockquote
> 
> sadfsdf

- `id.json`파일
	- 이게 필요한 이유는 딱 한가지다.
	- 마지막으로 사용된 id를 저장할 파일
- `idIncrement.js` 파일
	- 이게 필요한 이유도 딱 한가지다.
	- 포스트를 생성하고 frontmatter를 적용했을때 id가 자동적으로 ++ 되도록 하기 위해


먼저 가장 기본적인 templater의 사용방법은 다음과 같다.

1. 커뮤니티 플러그인에서 templater 찾아서 다운로드
2. template folder location 에 자동화 하고싶은 템플릿이 존재하는 템플릿 폴더 입력
3. Use script functions 탭 내부에 
	1. script files folder location 에 `idIncrement.js`와 같은 메서드가 존재하는 파일의 경로넣기
	2. 바로 아래의 새로고침 버튼을 눌러, Detected User script 업데이트 하기
4. *<font color="#c0504d">아예 자동화 하려면</font>*
	1. Trigger Templater on new file creation 토글 켜기
	2. 토글을 키면 나오는 Enable folder templates도 켜기
	3. 어떤 폴더 내부에 새로운 파일이 생성되면 Trigger될지 폴더경로와
	   어떤 템플릿을 Trigger 시킬지 템플릿 파일경로 넣기
	4. ![](src/assets/post/templater%20configuration.png)

좋다 그럼 시작해보자.
### id autoincrement

먼저 블로그 폴더 경로의 하위경로중 하나에 `id.json`파일을 만들고 열은다음

```json
//id.json
{
	"id": 0
}
```

으로 수정해주자.

그리고 해당 json파일이 있는 경로가 아닌 다른 경로에 `idIncrement.js`라는 스크립트 파일도 만들어주고 열은 다음,

```javascript
//idIncrement.js
const fs = require("fs");  
const path = require("path");  
  
// ✅ 절대 경로로 수정 (사용자의 실제 파일 위치)  
const ID_FILE_PATH = "C:/Users/{username}/Desktop/......";  
  
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
```

이렇게 작성해주도록 하자

이후 templater를 위에 말한 방법 1~3, 필요한 경우 4번까지 한다음 옵시디언을 껐다 키자.

그다음 템플릿을 수정해주자

```md
---
id: <%* tR += await tp.user.idIncrement(); %> //tp.user.filename(param)
title: <% tp.file.title %>
subTitle: test
tag: React Obsidian React-Blog 
date: <% tp.date.now("YYYY-MM-DD") %>
---
```

이런식으로 templater전용문법으로 적용시켜주면...

![](src/assets/post/templater%20auto%20increment.gif)

완료!!


---

## react내부에서 markdown 출력하기 + react syntax highlighter

react 내부에서 markdown을 매핑해서 태그로 묶어서 출력해주기로 했다

먼저 몇가지 의존성을 다운받아준다.

- remarkGfm (link, table, checklist 등의 형식 표현 할수있는 플러그인)
- rehypeRaw (html태그를 사용하더라도, 태그가 출력되지않고 올바르게 렌더링 시켜주는 플러그인)
- react-markdown (마크다운 파일을 각종 html태그로 변환하여 렌더링 시켜주는 컴포넌트 라이브러리)
- react-syntax-highlighter (코드블럭 사용시에 가독성을 높여주는 문법강조 라이브러리)

먼저 블로그에 표시할 md파일을 import해준다.

### 폴더 하위의 파일 전부 불러오는 법 

다만, vite에서는 import문으로 어떤 폴더 하위의 모든 파일을 불러오기가 쉽지않다.

이럴때 사용하는게

`import.meta.glob` 이다.
[[Glob import - vite]](https://ko.vite.dev/guide/features#glob-import)

이걸 이용해서 불러오면 다음과 같이 불러와진다

```javascript
//상대경로
const posts = import.meta.glob("/src/posts/*.md");
//출력 : /src/posts/~~~.md: () => import("/src/posts/~~~.md?import")....
```

여기서 얻을수있는값은 없다.

이걸 이용하려면 <font color="#c0504d">raw라는걸 활용해서, md파일 그자체를 text형식으로 바꾸어서 가져오는 방식</font>을 사용해야한다.

```javascript
const posts = import.meta.glob("/src/posts/*.md", { eager: true, as: "raw" });
```

이렇게 raw로 불러오면 출력이

`/src/posts/~~~.md: ~~~~~~~~(md파일 -> 텍스트 변환된 텍스트)` 가 된다.

이제 이렇게 얻어진 모든 md파일들은

1. frontmatter
2. content
형식으로 구분된다.

그러니 frontmapper와 content를 나눠주는 매퍼를 만들어주자,

```javascript
export const frontmatterMapper = (str) => {  
  
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;  
    const match = str.match(frontmatterRegex);  
  
    if (!match) {  
        throw new Error("add FrontMatter in your .md files")  
    }  
    const frontmatterTxt = match[1];  
    const contentTxt = match[2].trim();  
  
    const frontmatter = frontmatterTxt.split("\n").reduce((acc, line) => {  
  
        const [key, ...value] = line.split(":");  
  
        if (key && value) {  
  
            const parsedKey = key.trim();  
            const parsedValue = value.join(":").trim();  

			//tag 키는 value가 여러개 들어갈수있어서 미리 split해줌
            acc[parsedKey] = parsedKey === "tag" ? parsedValue.split(" ") : parsedValue;  
        }  
  
        return acc;  
    }, {});  
  
    const newVar = {  
        frontmatter,  
        content : contentTxt  
    };  
  
    return newVar  
}
```

크게 어려운 코드는 아니다.
`---` 2개를 기준으로 split해주고, frontmatter부분은 key와 value부분으로 나누어서 파싱해주는게 전부이다.

### react syntax highlighter + react markdown 사용!

```jsx
<ReactMarkdown  
    remarkPlugins={[remarkGfm]}  
    rehypePlugins={[rehypeRaw]}  
    components={{  
        code({className, children, ...props }) {  
            const match = /language-(\w+)/.exec(className || "");  
            const isInline = !className;  
  
            console.log(!isInline && Boolean(match));  
  
            return (!isInline && Boolean(match)) ? (  
                <SyntaxHighlighter  
                    language={match[1]}  
                    PreTag="pre"  
                    style={solarizedlight}  
                    wrapLines={true}  
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
```

이것도 크게 어려울게 없는 코드이다.

적용을 하게되면

![](src/assets/post/code%20style.png)


***참고로 prism스타일이 아닌 hljs스타일은 코드스타일이 적용안되니 참고!@!***
