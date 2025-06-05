---
id: 18
title: [Unity] Quaternion에 대해서
subTitle: 사원수, Quaternion과 보간에 대해 알아보자
tag: Unity Csharp Quaternion GameDev 
date: 2025-06-05
---

짐벌락, 복소수

Quaternion, Eulur, Slerp, LookRotation

vector3 이동은 quaternion 로테이션과 함께

## Quaternion

Quaternion은 3차원 벡터 x, y, z에 추가적인 하나의 실수값 w가 들어간 것을 의미한다.

[Vector3 from unity](https://dev.to/rojae1339/vector3-from-unity-47dm)

![](public/asset/posts/Pasted%20image%2020250605141412.png)

이렇듯, Vector3와 마찬가지로 구조체로 이루어져 있다.

즉, x, y, z라는 회전축과 w라는 회전량(스칼라 값)을 가진 구조이다.

>Scala: 방향 없이 크기만 가진 값을 의미함
>Vector: 방향과 크기 모두를 가진 값을 의미함

그럼 이렇게 4가지의 컴포넌트를 가지고 있는 이유가 뭘까?

### 짐벌락 / 오일러 각

3차원 벡터에서 축은 다음과 같이 생겼다.

![](public/asset/posts/Pasted%20image%2020250605141419.png)

이것을 다르게 표현해보면

![](public/asset/posts/Pasted%20image%2020250605141423.png)

가 된다.

이런 축을 기준으로 회전을 돌리다보면
![](public/asset/posts/Gimbal_Lock_Plane.gif)

이렇게 여러 축이 서로 고정되는 현상이 생기게 되는데, 이것이 짐벌락이다.

즉, 위 상황으로는 보라색축과 초록색축이 회전시에 같은 회전을 보이고 있다.

이렇게 되면, 한 축이 회전하고 있더라도, 회전하지않는 것처럼 보이게 된다.
이러한 회전방식을 오일러 각 회전이라고 한다.

이러한 문제를 해결하기 위해 나온것이 Quaternion이고, w크기인 것이다.

[유니티의 회전과 방향](https://docs.unity3d.com/kr/2023.2/Manual/QuaternionAndEulerRotationsInUnity.html)
## How to Ratate?

유니티 공식문서에서는 
>일반적인 경우, 스크립트에서 오일러 각을 사용하는 것이 더 좋습니다. 
>이 경우 각을 변수로 유지하고 회전에 오일러 각으로 _적용_하는 데만 사용해야 하고, 
>궁극적으로 쿼터니언으로 저장되어야 합니다. 
>오일러 각을 쿼터니언_에서_ 검색해서 가져올 수 있지만, 검색해서 가져온 후 수정하고 다시 적용하면 문제가 발생할 수 있습니다.
>[유니티 Quaternion](https://docs.unity3d.com/kr/2023.2/Manual/class-Quaternion.html)

즉, Quaternion의 오일러 각을 사용하는 것이 더 좋지만, 
회전을 쿼터니언에서 오일러 각으로 변환한 뒤 그 값을 수정하고 다시 쿼터니언으로 적용하는 방식은 예기치 않은 회전 결과를 초래할 수 있다는 말이다.

코드를 예시로 살펴보자.

1. x축을 quaternion에서 가져와서 수정한 경우
```cs
[SerializeField] private float rotSpeed;  
  
private void Update()  
{  
        Quaternion rot = transform.rotation;  
        rot.x += Time.deltaTime * rotSpeed;  
        transform.rotation = rot;  
      
}
```

![](public/asset/posts/quaternion1.gif)

이렇게 원하는 회전이 나오지 않게 된다.
>각도를 나타내지 않아서 생기는 문제

2. Quaternion에서 오일러 값을 읽고, 수정하고 적용하기

```cs
[SerializeField] private float rotSpeed = 170;  
  
private void Update()  
{  
    Vector3 angles = transform.rotation.eulerAngles;  
    angles.x += Time.deltaTime * rotSpeed;  
    transform.rotation = Quaternion.Euler(angles);  
      
}
```

![](public/asset/posts/quaternion2.gif)

짐벌락을 초래해버린다.

>Quaternion에서 값이 계산되어, 회전은 각각 매우 다른 오일러 각을 반환할 수 있으므로, 짐벌락 발생함

그럼 제대로 된 사용법은 뭘까?

3. 제대로 된 사용법

공식문서에서 말한대로, 오일러 각을 그대로 사용해주면 된다.
위의 두 코드는 Quaternion의 오일러각에서 값을 가져와 수정하고 적용하거나, value가 각도를 나타내지 않았다.

```cs
[SerializeField] private float rotSpeed;  
  
private float x;  
void Update ()   
{  
    x += Time.deltaTime * rotSpeed;  
    transform.rotation = Quaternion.Euler(x,0,0);  
}
```

![](public/asset/posts/quaternion3.gif)

잘 회전된다.

>오일러각을 클래스 변수에 저장하고, 오일러 각을 적용하는데만 사용하자
>오일러 각을 다시 읽는 것에 의존하지 말고!


### 정리

| 잘못된 방식                            | 권장 방식                                   |
| --------------------------------- | --------------------------------------- |
| `eulerAngles`를 매 프레임마다 읽고 수정      | 오일러 각을 별도 변수로 저장하고 수정                   |
| 수정 후 다시 `Quaternion.Euler()`로 만들기 | 수정된 오일러 각을 `Quaternion.Euler()`로 한번만 변환 |


## 사용법

예를들어 유저의 이동을 구현해야한다고 가정해보자

```cs
void OnKeyboard()  
{  
    if (Input.GetKey(KeyCode.W))  
    {  
        transform.rotation = 
	        Quaternion.Slerp(transform.rotation, 
					         Quaternion.LookRotation(Vector3.forward), 
					         _rotationSpeed);  
					         
        transform.position += Vector3.forward * (Time.deltaTime * _speed);  
    }  
    //...
}
```

이런식으로 WASD에 대한 회전을 Quaternion의 Slerp를 이용한 보간법으로 rotation의 각도와 Quaternion.LookRotation의 각도 사이로 \_rotationSpeed 만큼의 속도로 보간한다

>보간:
>A에서 B로 이동하는 경우에 그 사이를 일정한 비율로 **채우는** 것.

즉, 현재 유저의 rotation값(Quaternion)에서 새로운 Quaternion값(Quaternion.LookRotation(Vector3.forward))의 사이를
\_rotationSpeed값만큼으로 채운다.
시작지점과 도착지점의 길이는 1이고, 3번째 파라미터인 \_rotationSpeed값에 따라 비례한 위치를 Vector3로 반환한다

## Lerp vs Slerp

Lerp: Linear interpolate
Slerp: Spherical(shape like a ball, sphere) Linear interpolate

Lerp와 Slerp의 차이는,
Lerp: 선형 보간, 직선
Slerp: 구면 선형보간, 곡선
![](public/asset/posts/slerp.png)

\_rotationSpeed값이 1/3인경우, 
Lerp는 직선을 기준으로 1/3을 나눠서 정확하게 나누어 떨어졌지만
그것을 늘려 원으로 옮겨보면 정확히 1/3이 아니게 된다.

이렇게 직선기준으로 비율만큼 비례해 보간하는 방식이 `Lerp`,
곡선을 기준으로 비율만큼 비례해 보간하는 방식이 `Slerp`이다.