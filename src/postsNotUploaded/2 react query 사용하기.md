
`npm i @tanstack/react-query`로 다운

main이나 App컴포넌트를 감싸는 최상위 컴포넌트에서

```tsx
import {createRoot} from 'react-dom/client'  
import './index.css'  
import App from './App.tsx'  
import {BrowserRouter} from "react-router-dom";  
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";  
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";  

//this
const queryClient = new QueryClient({  
  
});  
  
createRoot(document.getElementById('root')!).render(  
	//this
    <QueryClientProvider client={queryClient}>  
        <BrowserRouter>  
            <App/>  
            <ReactQueryDevtools initialIsOpen={false}/>  
        </BrowserRouter>  
    </QueryClientProvider>  
)
```

이렇게 this부분을 만들어준다.

이후 필요한 상태에 대해서 update, put, post, delete등을 하는 axios나 fetch함수를 만들어준다

```tsx
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";  
  
interface IPost {  
    userId: number;  
    id: number;  
    title: string;  
    body: string;  
}  
  
const handleApiError = (e) => {  
    alert(`에러 발생: ${e instanceof Error ? e.message : String(e)}`);  
}  
  
const getPosts = async (): Promise<IPost[]> => {  
    try {  
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');  
  
        if (!res.ok) {  
            throw new Error('Failed to fetch posts');  
        }  
  
        return await res.json()// 데이터를 반환  
    } catch (e) {  
        handleApiError(e);  
        throw e;  
    }  
};  
  
const updatePost = async (id: number, content: Partial<IPost>): Promise<IPost> => {  
    try {  
        // 제목과 본문이 없으면 알림을 띄운 후 리턴  
        if (!content.title || !content.body) {  
            alert("내용을 입력하세요");  
            return;  
        }  
  
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {  
            method: "PUT",  
            headers: {  
                "Content-Type": "application/json", // 헤더 수정: 올바른 Content-Type 설정  
            },  
            body: JSON.stringify(content),  
        });  
  
        // 응답 처리  
        if (!res.ok) {  
            throw new Error("Failed to update post");  
        }  
  
         // 서버에서 반환된 데이터를 받아옴  
        return await res.json(); // 성공 시 수정된 데이터를 반환  
  
    } catch (e) {  
        handleApiError(e);  
        throw e;  
    }  
};  
  
const postPost = async (content: IPost): Promise<IPost> => {  
    try {  
        if (!content.title || !content.body) {  
            throw new Error('Unexpected post type');  
        }  
  
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {  
            method: "POST",  
            headers: {  
                "Content-Type": "application/json", // 헤더 수정: 올바른 Content-Type 설정  
            },  
            body: JSON.stringify(content),  
        });  
  
        // 응답 처리  
        if (!res.ok) {  
            throw new Error("Failed to create post");  
        }  
  
        // 서버에서 반환된 데이터를 받아옴  
        return await res.json(); // 성공 시 수정된 데이터를 반환  
    } catch (e) {  
        handleApiError(e);  
        throw e;  
    }  
}  
  
const deletePost = async (id: number): Promise<{message: string}> => {  
    try {  
  
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {  
            method: "DELETE",  
            headers: {  
                "Content-Type": "application/json", // 헤더 수정: 올바른 Content-Type 설정  
            }  
        });  
  
        // 응답 처리  
        if (!res.ok) {  
            throw new Error("Failed to delete post");  
        }  
  
        return {message: "Deleted successfully"}  
  
    } catch (e) {  
        throw new Error(`Error delete posts: ${e instanceof Error ? e.message : String(e)}`);  
    }  
}  
  
export const usePosts = () => {  
    // getPosts: useQuery는 데이터 조회용  
    const { data, isLoading, isError, error } = useQuery({  
        queryKey: ['posts'],  
        queryFn: getPosts,  
    });  
  
    // updatePost, postPost, deletePost는 useMutation을 사용해 데이터 수정, 생성, 삭제  
    const queryClient = useQueryClient();  
  
    const updatePostMutation = useMutation({  
        mutationFn: ({ id, content }: { id: number; content: Partial<IPost> }) => updatePost(id, content),  
        onSuccess: async () => {  
            await queryClient.invalidateQueries({ queryKey: ['posts'] });  
        },  
        onError: handleApiError,  
    });  
  
    const postPostMutation = useMutation({  
        mutationFn: ({content}: {content: IPost}) => postPost(content),  
        onSuccess: async () => {  
            await queryClient.invalidateQueries({queryKey: ['posts']});  
        },  
        onError: handleApiError  
    });  
  
    const deletePostMutation = useMutation({  
        mutationFn: ({id} : {id:number}) => deletePost(id),  
        onSuccess: async () => {  
            await queryClient.invalidateQueries({queryKey: ['posts']});  
        },  
        onError: handleApiError  
    });  
  
    return {  
        posts: data,  
        isLoading,  
        isError,  
        error,  
        updatePost: updatePostMutation.mutate,  
        createPost: postPostMutation.mutate,  
        deletePost: deletePostMutation.mutate,  
    };  
};
```

이후 사용할ㄸㅐ는

```tsx
import {useNavigate, useParams} from "react-router-dom";  
import {useRef, useState} from "react";  
import {usePosts} from "@/states.tsx";  
  
const PostDetailPage = () => {  
    const param = useParams();  
    const nav = useNavigate();  
    const {posts, isLoading, isError, createPost, updatePost, deletePost} = usePosts();  
  
    const modalBg = useRef<HTMLDivElement>(null); // 모달 바깥 영역 감지용 ref  
  
    const [ismodalOpen, setIsmodalOpen] = useState(false);  
    const [title, setTitle] = useState("");  
    const [body, setBody] = useState("");  
  
  
    const post = posts.find(p => p.id === Number(param.id));  
  
    // 모달 바깥 클릭 시 닫기  
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {  
        if (modalBg.current && !modalBg.current.contains(e.target as Node)) {  
            setIsmodalOpen(false);  
        }  
    };  
  
    if (isLoading) return <p>asdasd</p>  
    if (isError) return <p>asdasd</p>  
  
    return (  
		<form className={"flex flex-col gap-4 h-[75%]"}>  
			<input  
				className={"bg-gray-100 px-3 rounded-md w-1/3"}  
				placeholder={"title?"}  
				maxLength={15}  
				onChange={(e) => setTitle(e.currentTarget.value)}  
			/>                            
			<textarea                                
				className={"bg-gray-100 px-3 rounded-md h-full resize-none"} 
				placeholder={"body?"}  
				maxLength={200}  
				onChange={(e) => setBody(e.currentTarget.value)}  
			/>                        
		</form>  
		<button                            
			className="mt-4 bg-red-400 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-red-700"  
			onClick={() => {  
				if (title || body) {  
					updatePost({  
						id: post.id,  
						content: {  
							title: title ? title : post.title,  
							body: body ? body : post.body  
						}  
					});  
					setTitle("");  
					setBody("");  
					setIsmodalOpen(false);  
					return;  
				}  
  
				alert("내용을 입력하세요");  
			}}>  
			적용  
		</button>  
	);  
};  
  
export default PostDetailPage;
```

요론식으로 mutate를 이용해서 사용해주면 된다.

절대!절대!

리액트 쿼리로 관리되는 상태를 클라이언트 상태로 만들어 관리하진 말자