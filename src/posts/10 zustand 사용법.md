---
id: 10
title: [React] zustand 사용법을 익혀보자 - contextAPI의 문제점
subTitle: React ContextAPI문제점 및 상태관리 쉽고 간편하게!
tag: React Zustand 상태관리
date: 2025-02-28
---

![](public/asset/posts/zustand.png)

## 서론

상태관리 라이브러리가 필요한 이유가 뭘까?

contextAPI로는 만족할 수 없는 이유가 뭘까?

1. 일반적인 상태관리 없이는 props drilling문제가 존재한다.
2. contextAPI는 기본적으로 provider를 통해서 상태를 제공받는다.
	1. provider는 기본적으로 하위 컴포넌트에 context를 제공하는 역할을 하는 부모 컴포넌트이다.
	2. 리액트의 리렌더링은 컴포넌트에 변경이 일어날때 발생한다.
	3. context가 객체일때, context에 변경이 일어날때 해당 context를 사용하는 모든 컴포넌트에 리렌더링이 일어나게 된다.

### context API의 문제점
> [STACKOVERFLOW - React Context performance and suggestions](https://stackoverflow.com/questions/75060633/react-context-performance-and-suggestions)
> [React Official document - Context/caveats](https://ko.legacy.reactjs.org/docs/context.html#caveats)
> 
> **⏩ (요약)**
>
> **Context API를 사용할 때, 우리가 명시적으로 `props`를 전달하지 않더라도,  
Context State를 사용하는 컴포넌트들은 상태가 변경될 때마다 리렌더링됩니다.  
이것이 Context API의 근본적인 성능 문제입니다.**
><br><br>
> **질문 1: `useContext`를 사용하는 모든 컴포넌트가 리렌더링되는 것이 문제인가요?**
>
>네, 정확히 그렇습니다. (질문자가 언급한 내용이 맞습니다.)
><br><br>
>
> **질문 2: 그렇다면, 성능 문제는 정확히 무엇인가요?**
>
> React에서 **props가 변경되면 컴포넌트가 리렌더링됩니다.**  
Context API를 사용할 때는 **우리가 명시적으로 props를 전달하지 않더라도**,  
**Context 값이 변경될 때 해당 값을 사용하는 모든 컴포넌트가 리렌더링됩니다.**
>
> React 공식 문서에서는 이를 다음과 같이 설명합니다.
>
> Context는 **모든 레벨에서 명시적으로 props를 전달할 필요 없이** 값을 공유하는 방법을 제공합니다.
>
> 즉, Context API는 **글로벌 상태를 쉽게 공유할 수 있는 장점**이 있지만,  
한 가지 전제가 있습니다.
>
> **Context는 자주 변경되지 않는 글로벌 상태**를 저장하는 용도로 사용해야 합니다.
>
>📌 대표적인 예시:
>
> - **테마(Theme)**
> - **로그인 상태(Authentication/Login state)**
> - **언어 설정(Language/i18n)**
>
>위와 같은 데이터는 **변경될 때 전체 애플리케이션에 영향을 미치므로, "전체 리렌더링"이 자연스러운 경우**입니다.
><br><br>
>
> **질문 3: Context API 사용 시 내가 놓친 점이 있나요?**
>
>Context API는 글로벌 상태 관리에 **최적화된 도구가 아닙니다.**  
>즉, 자주 변경되는 데이터를 Context API로 관리할 경우, 불필요한 리렌더링이 발생할 수 있습니다.
>
> **이 문제를 해결하기 위해 Redux, Zustand 같은 상태 관리 라이브러리가 등장한 것입니다.**
>
> Redux는 Context API와 다르게 **별도의 전역 상태 저장소(store)**를 사용합니다.  
따라서, Redux는 **모든 컴포넌트에 props를 전달하지 않으면서도, 불필요한 리렌더링을 방지할 수 있습니다.**
>
하지만 Redux에는 또 다른 단점이 있습니다.

> **Redux를 사용하려면 추가적인 도구와 설정이 필요합니다.**
><br><br>
>📌 예를 들어, Redux에서 비동기 작업을 처리하기 위해 `Redux Thunk` 같은 미들웨어를 추가로 사용해야 합니다.  
>하지만 최근에는 **React Query/TanStack Query** 같은 라이브러리가 등장하면서,  
>Redux를 비동기 상태 관리에 사용하는 사례가 줄어들고 있습니다.
>
>이제 많은 사람들이 Context API를 **"글로벌 상태 관리 도구"**로 사용하고 있지만,  
>실제로는 **불필요한 리렌더링 문제**를 경험하고 있습니다.
>
>이러한 문제로 인해 일부 개발자는 다시 Redux/Zustand 등을 선택하고,  
>다른 개발자들은 Context API를 **"원래 의도한 방식"**으로 사용하여 성능 문제를 피하려고 합니다.
><br><br>
>📌 **성능 문제를 피하는 조건:**
>
> - **자주 변경되지 않는 글로벌 상태만 Context API로 관리**
> - **Context를 깊은 중첩 구조로 만들지 않기** (컴포넌트 계층이 깊어질수록 문제 발생 가능)
> - **use-context-selector 같은 라이브러리를 활용해 불필요한 리렌더링 방지**
>
>즉, **Context API는 "올바르게" 사용하면 좋은 도구지만, "잘못 사용하면" 성능 문제가 발생합니다.**  
>이건 사실 거의 모든 도구에도 적용되는 원칙입니다.
><br><br>
>📌 **추가 정리**  
>질문자가 지적한 대로, Context API는 **모든 자식에게 props를 자동으로 전달하지 않습니다.**  
>하지만 **Context를 사용하는 컴포넌트(Consumer)들은 해당 값이 변경될 때마다 리렌더링됩니다.**  
>그리고 이 Consumer들이 다시 하위 컴포넌트들에게 props를 전달하면, 결국 전체 트리가 불필요하게 리렌더링될 수 있습니다.
><br><br>
>제 예상으로는,
>
> **React가 Context를 "컴포넌트"처럼 다루기 때문에 발생하는 문제일 가능성이 큽니다.**  
> Redux/Zustand는 독립적인 저장소를 사용하기 때문에 이 문제가 없습니다.

즉, context API의 문제는 다음과 같다

1. contextAPI는 글로벌로 관리될 상태를 쉽게 공유할 수 있지만, 성능 문제가 발생할 수 있음
2. 상태가 변경된다고 해서 무조건 리렌더링이 필요하지 않을 수도 있는데, context api는 무조건 리렌더링발생
3. 그것을 해결하려면 useMemo같은 최적화를 해야하는데, 이것도 일임
<br><br>
결국 문제는 contextAPI는 컴포넌트로 상태를 관리하는 형식이어서 문제가 있는거다.

그래서 zustand, redux, react query같은 전용 저장소를 이용하는 형식의 상태관리 라이브러리가 인기인 것이다.

## zustand 사용법

>zustand는 클라이언트 상태 관리에 특화되어 있다!

간단하다. 

store로 만들어주고, 필요한 메서드들을 구현해놓으면 된다.

```tsx
import {create} from "zustand"  
  
interface IPost {  
    userId: number;  
    id: number;  
    title: string;  
    body: string;  
}  
  
interface IUsePostsStore {  
    posts: IPost[];  
    fetchPosts: () => Promise<void>;  
    updatePosts: (id: number, newContent: Partial<IPost>) => void;  
    deletePosts: (id:number) => void;  
}  
  
const usePostsStore = create<IUsePostsStore>((set, get) => ({  
    posts: [],  
    
    fetchPosts: async () => {  
    
        try {  
            const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
            );  
            
            const data: IPost[] = await response.json();  
            
            set({posts: data});  
        } catch (e) {  
        
            console.log(e);  
        }  
    },
	
    updatePost: async (id, newContent) => {
	    try {
		    //서버에서 반환값으로 페칭된 데이터 주면 response에 저장됨
	        const response = await fetch(
	        `https://jsonplaceholder.typicode.com/posts/${id}`, 
	        {
	            method: "PUT", // 일부 업데이트만 가능하다면 "PATCH" 사용 가능
	            headers: { "Content-Type": "application/json" },
	            body: JSON.stringify(newContent),
	        });

	        if (!response.ok) throw new Error("Failed to update post");
	
	        // 서버에서 반환된 최신 데이터 받기
	        const updatedPost: IPost = await response.json();

        // ✅ Zustand 상태 업데이트
	        set((state) => ({
	            posts: state.posts.map((post) => (post.id === id ? updatedPost : post)),
	        }));

	    } catch (error) {
	        console.error("Error updating post:", error);
	    }
	},

	//....
    )}
)
```

이런식으로 post에 대해서 틀을 잡고, store에 대해서 틀을 잡은다음

해당 인터페이스들을 이용해서 각 메서드들을 구현하면 된다.

물론 나중에 이러한 서버상태는 react query같은걸로 관리하면 더 편해진다.

- react query장점
	- 자동 캐싱
		- 서버에 요청한 후 같은 데이터를 요청할때 캐시에서 가져오도록 함
	- 자동 재시도
		- 서버 요청 실패시 자동 재시도
	- 페이지네이션 및 무한 스크롤 지원
	- 서버상태과 클라이언트 상태 분리 가능