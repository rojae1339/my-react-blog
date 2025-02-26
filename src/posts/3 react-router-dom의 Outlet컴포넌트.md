---
id: 3
title: [React] react-router-dom의 Outlet컴포넌트
subTitle: 공통적으로 쓰이는 메인 레이아웃 설정하기!
tag: React react-router-dom Outlet
date: 2025-02-17
---

[React Router: What is the purpose of using <Outlet /> alone without context? \[stack overflow\]](https://stackoverflow.com/questions/73573071/react-router-what-is-the-purpose-of-using-outlet-alone-without-context)

## outlet이 뭔데?

프론트엔드 개발을 하거나, 여러 웹페이지들을 볼때,
- 전체적으로 틀은 같지만, 내용물만 다른?
느낌을 받은적이 있을것이다.

내 웹페이지도 그러한 경우중 하나이다.

- home 화면
	- ![](public/asset/posts/blog_home.png)
- post detail 화면
	- ![](public/asset/posts/blog_postdetail.png)
- 전체 tags 화면
	- ![](public/asset/posts/blog_tags.png)

등등...

중앙부분의 main만 변경이 필요하고, 
좌측의 profile, 우측의 panel, 상단의 header부분은 변경이 없다.

> 여기서 변경이 없다는 의미는, 내용물은 다를지언정 틀이 바뀌진 않았다는 의미

이렇게 전체적으로 같은데 특정부분만 계속해서 변경이 필요할때 어떻게 하면 좋을지 찾아보니
`react-router-dom`의 `<Outlet/>`컴포넌트를 이용하면 된다는 것을 발견했다.

> `Outlet`은 라우팅을 할때 중첩된 라우트를 렌더링 할때 사용되는 컴포넌트

## 어떻게 사용?

1. 레이아웃 내부에서 변경이 되어야하는 부분을 `<Outlet/>`으로 지정해준다.
2. 상위 라우트에서 element속성을 이용해 레이아웃을 지정해준다.
3. 각 라우트 페이지에서 `<Outlet/>`컴포넌트로 이용될 컴포넌트를 작성한다.

즉,
```js
//MainPageLayout.jsx
const MainPageLayout = () => {  
  
    return (  
        <div>
            <div className={`profile-container`}>  
                <Profile/>  
            </div>  
   
            <div>  
                <div">  
                    <Outlet/>
                </div>  
                <div className="right-panel">  
                    <HomeRightPanel/>  
                </div>  
            </div>  
        </div>  
    );  
}
```

이렇게 메인 레이아웃 내부에 `Outlet`을 이용해 필요한 부분을 각자 렌더링 할수있도록 만듬

```js
//App.js
function App() { 
  
    return (  
        <BrowserRouter>  
            <Routes>  
	            <Route element={<MainPageLayout/>}>  
                    <Route path={"/"} element={<HomePage/>}/>  
                    <Route path={"/:postTitle"} element={<PostDetailPage/>}/>  
                    <Route path={"/tags"} element={<TagsPage/>}/>  
                    <Route path={"/tags/:tag"} element={<TagsSearchPage/>}/>  
                    <Route path={"/archives"} element={<ArchivesPage/>}/>  
                    <Route path={"about-me"} element={<AboutmePage/>}/>  
                </Route>  
            </Routes>  
        </BrowserRouter>  
    )} 
```

이렇게 상위 Route에서 element속성으로 메인 레이아웃을 지정해준 다음

각페이지에서

```js
//HomePage.jsx
const HomePage = () => {  
    return (  
        <PostList/>    
    );  
};  

//PostDetailPage.jsx
const PostDetailPage = () => {  
    return (  
        <PostDetail />    
    )
}
```

`Outlet`에 해당될 컴포넌트를 각자 렌더링 해주면 된다.