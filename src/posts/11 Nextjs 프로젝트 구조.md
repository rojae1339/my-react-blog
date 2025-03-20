---
id: 11
title: [NextJs] 프로젝트 구조
subTitle: NextJs는 앱라우팅을 사용하는데... 프로젝트 구조는 어떻게 짜지?
tag: NextJs 앱라우팅 공식문서 프로젝트구조 
date: 2025-03-20
---

# 프로젝트 구조

## 최상위 폴더
Nextjs 는 앱라우터 방식

`app`폴더
- 앱 라우터 / 최상위 라우터

`pages.js/jsx/tsx`
- 폴더의 페이지라우터

`public`폴더
- 프로젝트 정적 assets

`src`폴더
- optional 폴더
- 사용해도 되고, 안해도 되는 최상위 폴더
- 만약 사용할경우, `src/pages.js/jsx/tsx`는 무시됨.

## 최상위 파일
여러가지가 존재하지만, 중요한 몇가지만 살펴보자

`next.config.js`
- nextjs 구성파일

`package.json`
- 프로젝트 종속성 및 스크립트

`middleware.ts`
- 미들웨어
- 페이지 렌더링 전 서버 측에서 실행될 함수
- 사용되는곳
	- 인증 및 인가
		- 엔드포인트 액세스 권한을 부여하기전 사용자 신원확인 및 세션 쿠키 확인
	- 서버 측 리디렉션
		- 특정 조건에 따라 서버수준에서 사용자 리디렉션
	- 경로 재작성
		- 요청 속성에 따라 api경로나 페이지 경로 재작성
	- 봇 감지
		- 봇 트래픽 감지 차단
	- 로깅 및 분석
		- 페이지나 엔트포인트에서 처리 전, 요청 데이터를 캡처 후 분석
- 사용 지양 해야하는 곳
	- 복잡한 데이터 페칭 및 조작
	- 무거운 계산 작업
	- 국소적이지 않은 세션 관리
	- 직접 데이터베이스 접근

`.env/.env.local/.env.production/.env.development`
- 환경변수/로컬환경변수/프로덕션 환경변수/개발 환경변수

## 라우팅

`layout`
- 해당 폴더 하위의 레이아웃 지정
- app/a/b/c/page.tsx가 존재할때, app과 하위 모든폴더에 layout이 존재한다면, 
  appLayout-aLayout-bLayout-cLayout-cPage가 각 children으로 들어가 렌더링됨

`page`
- 기본적으로 서버 컴포넌트, 클라이언트 컴포넌트로 설정가능
- 렌더링 될 페이지
- 동적경로 혹은 쿼리파라미터가 url에 존재할 경우, 
  props로 params 혹은 searchParams를 받아서 바로 사용 가능

`loading`
- 기본적으로 서버 컴포넌트, 클라이언트 컴포넌트로 사용가능
- 데이터 페칭이나 페이지렌더링 로딩중에 표시될 컴포넌트
- 스켈레톤 컴포넌트/스켈레톤 UI

`not-found`
- 기본적으로 404에러에 대한 에러페이지를 렌더링 할 컴포넌트
- 라우터마다 다른 404에러 렌더링 가능

`error`
- 예상치 못한 에러가 throw되면 렌더링될 컴포넌트
- [error 컴포넌트 props](https://nextjs.org/docs/app/api-reference/file-conventions/error#props)

`global-error`
- 루트 폴더의 error컴포넌트는 루트폴더에 존재하는 컴포넌트에서 에러가 나도 해당 에러는 캐치하지 않음
- 이런 에러를 캐치하려면 `global-error`컴포넌트 써야함

`route`
- 라우트 핸들러라 불리고, 백엔드 역할을 함.
- api 엔드포인트에 요청을 보낼때 사용하게 됨
	- get, post, update, put, patcj, delete 모두 지원
	- 메서드를 비동기로 구현해주면됨
	- [라우트 핸들러](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#convention)
	- [route.ts HTTP Methods](https://nextjs.org/docs/app/api-reference/file-conventions/route)
- 클라이언트에서 api에 접속해 각종 http리퀘스트를 날려주고 서버에 데이터를 저장하고, 가져오고 하면 된다
- 폴더별로 route를 만들어 데이터 처리 가능
- [라우트 핸들러 사용예시](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#examples)

`template`
- layout과 비슷함
- layout은 페이지를 여러차례 이동해도 리렌더링이 되지않음 -> 상태유지
- 이런 상태유지가 아닌 페이지를 여러차례 이동할때마다 children이 마운트되고, 리렌더링이 필요하고, effect가 동기화 되어야하면 template으로 해결가능

`default`
- 병렬 라우트라는 개념을 이해해야한다.
	- 간단하게 설명하면 하나의 페이지에 여러개의 페이지를 렌더링 하는 라우트이다.
	- `@`을 사용하는 슬롯(slot)폴더로 사용 가능
		- ![](public/asset/posts/slot-parallel%20route.png)
	- 한 페이지에 여러 페이지를 넣어 각각 error, loading등을 따로 적용시킬 수 있음
	- 상위 컴포넌트 layout에서 해당 슬롯폴더의 컴포넌트를 props로 받아 layout지정가능
		- ![](public/asset/posts/slot%20component%20props%20layout.png)
	- 모달, 사이드바, 병렬페이지등 다양한 곳에서 사용
- default는 인터셉트 라우트임
- 슬롯 폴더에서 렌더링할 페이지가 없을때 기본적으로 렌더링 할 컴포넌트임
- 즉, fallback역할임

## 중첩 폴더 경로

중첩된 경로로 라우트가 생성 된다

`folder`, `folder/folder/folder....`

## 동적 경로

`[folder]`
- 동적 경로
- `/domain/post/[folder]/page.tsx` 처럼 사용됨
- id or slug용
- 1개의 동적경로만 지정됨

`[...folder]`
- 포괄 동적경로
- `/shop/[...folder]/page.tsx` 처럼 사용됨
- 모든 동적경로 사용가능

>|api|example api|params|
>|-|-|-|
>|`/shop/[...folder]/pages.tsx`|/shop/a|`{folder: ['a']}`
>|`/shop/[...folder]/pages.tsx`|/shop/a/b|`{folder: ['a', 'b']}`
>|`/shop/[...folder]/pages.tsx`|/shop/a/b/c|`{folder: ['a', 'b', 'c']}`

- 이렇게 여러개의 동적경로 가능

`[[...folder]]`
- 선택 포괄 동적경로
- 하위 모든경로의 동적경로 매칭됨

>|api|example api|params|
>|-|-|-|
>|`/shop/[[...folder]]/pages.tsx`|/shop|`{folder: [undefined]}`
>|`/shop/[[...folder]]/pages.tsx`|/shop/a|`{folder: ['a']}`
>|`/shop/[[...folder]]/pages.tsx`|/shop/a/b|`{folder: ['a', 'b']}`
>|`/shop/[[...folder]]/pages.tsx`|/shop/a/b/c|`{folder: ['a', 'b', 'c']}`

## 그룹 경로 및 개인 폴더

`(folder)`
- 라우팅에 영향이 없는 그룹 라우트
- ![](public/asset/posts/group%20routes.png)
- 로그인 전/후, 라우팅 없이 도메인 묶기 등
- https://reactnext-central.xyz/blog/nextjs/route-group

`_folder`
- 라우팅에서 제외될 폴더
- 라우팅될 페이지와 ui혹은 상수 분리
- 하위에 예약어 파일인 page, layout등이 들어있어도 무시됨

## 병렬, 인터셉트 라우트

`@folder`
- 병렬 라우팅을 할 수 있게 하는 폴더
- 해당 폴더에 존재하는 page를 바로 상위 폴더의 layout에서 props로 폴더명을 이용해 받을 수 있음
	- ![](public/asset/posts/parallel%20routes%20slot.png)
	- 이런 구조일때, 
	- ![](public/asset/posts/slot%20ig.png)
	- 이런식으로 props로 폴더명을 받아서 layout에 사용가능

`(.)folder, (..)folder, (..)(..)folder, (...)folder`
- 각각 순서대로, 동일 레벨, 한단계 상위레벨, 두단계 상위레벨, 루트 폴더 인터셉트 라우트 폴더이다
	- 원래 링크를 이용하면, 화면 전체가 변경이됨
	- 하지만 해당 인터셉트 라우트를 사용하면, 하위 라우트에서 창 변경없이 url을 변경하면서 창을 기본화면 위로 모달처럼 띄울 수 있음
	- 사진 클릭시 사진 크게보는 모달창, 유저 클릭시 우측에 유저정보 나오는 사이드바 등등 다양한곳에서 사용가능

## 메타데이터 아이콘

### 앱 아이콘

`favicon.ico`
- 브라우저 탭, 북마크, 검색결과등에 표시되는 작은 아이콘
- 루트 라우트에서 사용(/app)
- 자동으로 파비콘 설정됨

`icon.ico|jpg|jpeg|png|svg`
- 프로젝트 대표 아이콘
- 루트 라우트에 파비콘이 없으면 해당 아이콘이 파비콘으로 사용됨
- 하위 라우트에 icon이 존재하면, 해당 라우트는 해당 아이콘으로 대체됨
- 되도록이면 app에 1개만 넣어놓자

`apple-icon.jpg|jpeg|png`
- 애플 기기 웹사이트 전용 아이콘
- 하위 라우트에 icon이 존재하면, 해당 라우트는 해당 아이콘으로 대체됨
- 되도록이면 app에 1개만 넣어놓자

### 오픈그래프, 트위터 이미지
`opengraph-image.jpg|jpeg|png|gif`
- 정적 오픈그래프 이미지

`opengraph-image/js|ts|tsx`
- 동적 오픈그래프 이미지 생성
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx

`twitter-image.jpg|jpeg|png|gif`
- 정적 트위터 이미지 

`twitter-image/js|ts|tsx`
- 동적 트위터 이미지 생성
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx

### SEO

>사이트맵: 웹 사이트 내의 페이지, 동영상, 이미지, 뉴스 등의 콘텐츠 목록을 나열하고, 그 관계에 관한 정보를 체계적/계층적으로 명시한 파일
><br><br>
>로봇: 웹 사이트의 검색엔진 로봇들의 접근을 조절/제어하는 파일

`sitemap.xml`
- 정적 사이트맵 파일

`sitemap.js|ts`
- 동적 사이트맵 파일

`robots.txt`
- 정적 로봇 파일

`robots.js|ts`
- 동적 로봇 파일