
먼저 프로젝트 구조이다

```
HOUSEHOLD-ACCOUNT-BOOK/
SRC
|---navigateConstants.tsx
|
+---app
|   |   globals.css
|   |   layout.tsx
|   |   page.tsx
|   |
|   +----component
|   |       Header.tsx
|   |       Sidebar.tsx
|   |
|   \---(auth)
|       |   default.tsx
|       |   layout.tsx
|       |
|       +---@modal
|       |   |   default.tsx
|       |   |
|       |   +---(.)signin
|       |   |       page.tsx
|       |   |
|       |   \---(.)signup
|       |           page.tsx
|       |
|       +---signin
|       |       page.tsx
|       |
|       \---signup
|               page.tsx
|
//...
```

auth 그룹라우트로 signin signup 모달창을 띄워주려고 한다.

병렬 & 인터셉트 라우트로 모달창을 띄우려면

## default.js
가 필수이다.
이게 없으면 404에러가 생긴다.

따라서 모달창을 띄우려는 라우트에 
```tsx
export default function Default() {return null;}
```
로 404를 막아주자.

위의 구조대로 api접근시 모달창이 띄워지긴함.

## layout.tsx
위의 경로기준
`app/(auth)/layout.tsx`에 모달창을 띄워줘야 한다.

```tsx
export default function BeforeSignupLayout({ children, modal }: HomeLayoutProps) {  
    return (  
        <div>            {children}  
            {modal}  
        </div>    );  
}
```

### 즉
default는 그룹라우트 & 병렬라우트 내부에 만들어줘야 404에러가 안생기고
사용할 모달은 해당 모달이 속한 병렬 라우트에 선언해줘야 함
예: `/app/a/b/c/d/@modal/(.)e/page.tsx`이면, 
layout은 `/app/a/b/c/d/@modal/layout.tsx`
default는 `/app/a/b/c/d(default.tsx)/@modal/default.tsx`해줘야 한다.

근데 문제가 잇음

## 모달창은 기존 창 위에 띄우는건데 왜 안되지?
![](public/asset/posts/modal.gif)

이렇게 버튼을 누르면 모달창이 위로 떠야하는데 새로운 창으로 뜨는것처럼 보여진다.

이유를 자세하게는 모르겠지만, 짐작한 바로는 
1. `상위의 page가 하위의 default에게 먹힌다`
2. `상위의 page가 그룹라우팅 내부의 병렬/인터셉트 라우트에는 영향을 끼칠 수 없다`

그래서 찾은 방법은

default에 페이지 렌더링 하기
```tsx
export default function DefaultModal() {  
    return <HomePage />;  
}
```

이런식으로 page를 디폴트로 렌더링해줘서 출력해주기

근데 page에서 전체를 복사후 가져오는게 좋은지, 위처럼 page컴포넌트를 가져오는게 좋은지 몰것음