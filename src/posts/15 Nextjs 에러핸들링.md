---
id: <%* tR += await tp.user.idIncrement(); %>
title: [NextJs] 에러 핸들링
subTitle: 간단하게 에러 핸들링하기
tag: NextJs 에러핸들링 공식문서 error.tsx global-error.tsx
date: <% tp.date.now("YYYY-MM-DD") %>
---

에러에는 2가지 종류의 에러가 존재한다.

1. Expectable Error
2. Unexpected Error

## 1. 예측가능한 에러

예측 가능한 에러는 다음과 같은 상황을 말한다.

1. 데이터 관련 처리중 발생할 에러
2. 잘못된 경로요청에 대한 에러

이렇듯 개발자가 예측가능한 에러들을 말한다.

이러한 에러는 3가지 방법으로 처리할 수 있다.

### 서버 액션

`'use server'`를 사용하는 액션에서 데이터등을 페칭,업데이트 등을 할때 에러처리 분기를 줘서 처리하는 방법이다

```tsx
'use server'
 
export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
 
  const res = await fetch('https://api.vercel.app/posts', {
    method: 'POST',
    body: { title, content },
  })
  const json = await res.json()
 
  if (!res.ok) {
    return { message: 'Failed to create post' }
  }
}
```

이렇게 form에서 잘못된 데이터가 들어왔다면 res로 인해 object에 message가 담겨서 리턴되게 된다.

이렇게 반환된 값이 존재하면 

```tsx
'use client'
 
import { useActionState } from 'react'
import { createPost } from '@/app/actions'
 
const initialState = {
  message: '',
}
 
export function Form() {
  const [state, formAction, pending] = useActionState(createPost, initialState)
 
  return (
    <form action={formAction}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>Create Post</button>
    </form>
  )
}
```

이렇게 `useActionState`의 state에 값이 담기게 되고, message가 존재하면 에러메세지가 출력되게 된다.

물론 에러 모달을 띄우는것도 좋을것이다.

### 서버 컴포넌트/not-found.tsx

서버 컴포넌트 내에서 데이터 작업이 이루어지면 반환값으로 에러를 띄우거나 redirect를 해준다

```tsx
export default async function Page() {
  const res = await fetch(`https://...`)
  const data = await res.json()
 
  if (!res.ok) {
    return 'There was an error.'
  }
 
  return '...'
}
```

혹은 404에러 페이지를 띄우면 된다.

```tsx
import { getPostBySlug } from '@/lib/posts'
 
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
 
  if (!post) {
    notFound() //not-found.tsx
  }
 
  return <div>{post.title}</div>
}
```

```tsx
export default function NotFound() {
  return <div>404 - Page Not Found</div>
}
```


## 예측하지 못하는 에러

사용자의 잘못된 요청, 잘못된 사용으로 인해 개발자가 예측하지 못했을때 발생되는 에러이다. 

### error.tsx

앱 라우트 방식에서는 폴더로 라우트를 나눈다.

![](public/asset/posts/Pasted%20image%2020250329103744.png)

이렇게 라우트가 되어있으면 

`/app/error.js`는 해당 폴더와 연결되어있는 하위의 모든 폴더경로(세그먼트)에 error바운더리를 제공한다.

그리고 하위 폴더에서 error.tsx를 다시 만들어서 더욱 다양하고 각 페이지에 알맞게 에러를 설정해줄 수 있다.

```tsx
'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
```

### global-error.tsx

`/app/error.tsx`는 `/app/template` & `/app/layout`에 대한 에러를 처리하지 않는다.

이런 컴포넌트에서 모든 에러를 핸들링하기 위해선 `global-error.tsx`를 만들어주면 된다.

다만 이 에러핸들링은 모든 에러에 대한 핸들링이 될 수 있으므로

`html`태그와 `body`태그를 무조건 포함하고 있어야한다.

```tsx
'use client' // Error boundaries must be Client Components
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```