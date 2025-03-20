---
id: 12
title: [NextJs] 이미지 및 글꼴
subTitle: NextJs에서는 이미지, 글꼴을 자체적으로 지원한다고??
tags: NextJs 이미지컴포넌트 글꼴 공식문서 
date: 2025-03-20
---

## 이미지 컴포넌트

- 이미지나 글꼴은 static asset으로 관리하기 -> 루트 디렉토리 바로 하위에 `public`폴더 만들어서 사용
- nextjs에서는 이미지를 넣기위해 `<img>`태그가 아닌 `next/image`에서 Image컴포넌트를 import해 사용
	- `import Image from 'next/image`
- 원격이미지, 정적이미지 모두 사용가능
	- 원격이미지 : `www.google.com/image-remmote-blablabla`
	- 정적이미지 : `./img.png`
- Image컴포넌트에서 사용가능한 props목록
	- https://nextjs.org/docs/app/api-reference/components/image#props

## 폰트

- 구글 폰트 자체적으로 호스팅되어 사용가능
	- `import {...} from next/font/google`
- 가변글꼴 지향
	- [가변글꼴 문서](https://namu.wiki/w/%EA%B0%80%EB%B3%80%20%EA%B8%80%EA%BC%B4)
	- 가변글꼴이 아닌 글꼴 사용할경우 가중치 적용해줘야함
- 로컬글꼴 사용가능
	- `import localFont from next/font/local`로 로컬폰트 불러온 후
	  `const myFont = localFont({src:'local-dir'})`
	- 글꼴 패밀리도 적용가능