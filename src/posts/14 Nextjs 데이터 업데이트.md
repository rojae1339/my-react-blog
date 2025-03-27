---
id: 13
title: [NextJs] 데이터 업데이트
subTitle: 클라이언트/서버 컴포넌트에서 각각 데이터 업데이트 하기
tag: NextJs 데이터업데이트 공식문서 revalidatePath useActionState formAction
date: 2025-03-26
---

기본적으로 넥스트는 별도로 데이터 업데이트를 하는 파일을 만들어 사용하는걸 권장함

```tsx
// /app/lib/actions.tsx

'use server'
 
export async function createPost(formData: FormData) {}
 
export async function deletePost(formData: FormData) {}
```

## useServer

use client처럼 서버측에서 실행될 수 있는 함수 혹은 파일을 지정할때 사용함

서버 컴포넌트, 클라이언트 컴포넌트 어디에서든 사용가능
```tsx
import { db } from '@/lib/db' // Your database client
 
export default function UserList() {
  async function fetchUsers() {
    'use server'
    const users = await db.user.findMany()
    return users
  }
 
  return <button onClick={() => fetchUsers()}>Fetch Users</button>
}
```

클라이언트에서 해당 서버측 함수느 파일을 사용할때는 그냥 import해서 쓰면됨

```tsx
'use client'
 
import { createPost } from '@/app/actions'
 
export function Button() {
  return <button formAction={createPost}>Create</button>
}
```


## 폼으로 데이터 오고가기

```tsx
import { createPost } from '@/app/actions'
 
export function Form() {
  return (
    <form action={createPost}>
      <input type="text" name="title" />
      <input type="text" name="content" />
      <button type="submit">Create</button>
    </form>
  )
}
```

이렇게 form태그의 action속성이 추가되어 비동기작업(페칭, 업데이팅, 삭제 등등)을 간편하게 할수있음

각 input태그의 name값에 따라

```tsx
'use server'
 
export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
 
  // Update data
  // Revalidate cache
}
```

이렇게 FormData에서 각 name을 get해서 값을 가져오면 됨.

## 이벤트 핸들링

useActionState나 useState쓰면 되긴한데, useActionState가 기능이 더 많고 대기기능도 있어서 좋음

```tsx
'use client'
 
import { useActionState } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'
 
export function Button() {
  const [state, action, pending] = useActionState(createPost, false)
 
  return (
    <button onClick={async () => action()}>
      {pending ? <LoadingSpinner /> : 'Create Post'}
    </button>
  )
}
```

### useActionState
```tsx
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

**파라미터**

fn:
- 폼이 제출되거나 전달될때 호출되는 함수

initialState
- intialState는 state의 기본값

optional permalink
- 만약 `fn`이 [서버 함수](https://ko.react.dev/reference/rsc/server-functions)이고, 폼이 자바스크립트 번들이 로드되기 전에 제출되면, 브라우저는 현재 페이지의 URL 대신 지정된 영구 링크Permalink URL로 이동함

**반환값**

state
- 상태 값

formAction
- form의 action속성이나 button의 formAction에 전달할 액션 -> 첫번째 파라미터 fn임

isPending
- 액션이 대기중인지 알려주는 플래그

## 캐시 재확인 revalidatePath

업데이트가 되면, 기존의 엔드포인트에 있는 데이터와 관련된 엔드포인트들의 데이터들을 업데이트 해줘야함

```tsx
'use server'
 
import { revalidatePath } from 'next/cache'
 
export async function createPost(formData: FormData) {
  // Update data
  // ...
 
  revalidatePath('/posts')
}
```

이렇게 사용하면 됨

### revalidatePath

그냥 파라미터로 전달하는 경로에 있는 데이터를 캐시와 비교해서 변경된 부분만 리렌더링 하는 메서드

```tsx
revalidatePath(path: string, type?: 'page' | 'layout'): void;
```

첫번째 파라미터가 위에 말한 파라미터고
두번째 파라미터는 해당 경로의 page를 캐시비교할지, layout을 캐시비교할지 정하는 파라미터 

기본값은 page이고, layout을 하게되면, 중첩된 모든 엔드포인트들의 캐시까지 비교해서 리렌더링 하겠다는 뜻