
```tsx
interface IComments {  
    postId: number;  
    id: number;  
    name: string;  
    email: string;  
    body: string;  
}  
  
interface IUseComments {  
    comments: IComments[];  
    updateComments: (id:number, newContent:Partial<IComments>) => void;  
}  
  
const useCommentsStore = create<IUseComments>((set) => ({  
    comments: [],  
    
    updateComments: async (id: number, newContent: Partial<IComments>) => {  
    /**  
     * 여기서 newContent 검증이나 파싱처리 하기  
     */  
     
    try {  
        // 서버에 업데이트 요청 (JSONPlaceholder에서는 실제 변경은 반영되지 않음)  
        const response = await fetch(  
            `https://jsonplaceholder.typicode.com/comments/${id}`, {  
                method: "PUT", // JSONPlaceholder에서는 PATCH도 가능  
                headers: {  
                    "Content-Type": "application/json"  
                },  
                body: JSON.stringify(newContent)  
            });  
  
        if (!response.ok) throw new Error("Failed to update comment");  
  
        const updatedComment = await response.json(); // 서버에서 반환된 데이터  
  
        // Zustand 상태 업데이트  
        set((state) => ({  
            comments: state.comments.map((comment) =>  
                comment.id === id ? {...comment, ...updatedComment} : comment  
            ),  
        }));  
    } catch (error) {  
        console.error("Error updating comment:", error);  
    }  
}
}))

//-----------------------------------------------

import { useCommentsStore } from "@/states"; // Zustand 스토어 import

const fetchComments = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error("Failed to fetch posts");
    return await response.json();
	
	//...
};


```

> 여기선, fetch는 따로 분리를 해두는편이 낫긴하다.
> 어짜피 전역으로 관리되면 리렌더링이 될텐데, 
> 그걸 염두에 두고 fetch를 스토어에 두는건
> 두 개의 전혀다른 문맥이 같이 들어가있어서 응집도가 떨어진다.

중요하게 살펴볼건 fetch하는 코드이다.

`async () => {...}`
- 비동기 함수선언
- 댓글 목록을 가져오는 역할

`const response = await fetch(API endpoint);`
- api endpoint에서 get으로 데이터를 받음
- await로 요청이 완료될때까지 기다림

`if (!response.ok) throw new Error("Failed to fetch posts");`
- response가 false면 error

