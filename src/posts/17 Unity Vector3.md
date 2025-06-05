---
id: 16
title: [Unity] Vector3에 대해서
subTitle: 3차원 벡터를 공부해보자
tag: Unity Csharp Vector3 GameDev 
date: 2025-06-05
---

# Vector3?

기본적으로 GameObject가 물리연산이나 단순 position변경으로 인해 움직이게 되면 position에 변화가 일어나게 된다.
이 position은 Vector3 라는 **구조체** 로 이루어져 있다.

![](images/Pasted%20image%2020250604112825.png)
![](images/Pasted%20image%2020250604112840.png)

위 사진에서 보이다싶이 Transform의 position은 Vector3이고, Vector3는 struct라는것이 확인가능하다

그럼 Vector3의 사용용도는 무엇일까?

## 위치 

말 그대로 위치를 확인할 수 있다.

Vector3는 3개의 축을 기준으로 작동한다.

x axis: 가로
y axis: 세로(수직)
z axis: x축에 대한 2차원 공간의 세로

![](images/Pasted%20image%2020250604114110.png)

이렇게 이루어진다.

또한, 2차원 공간에서는 z축의 의미가 사물의 앞뒤 위치의 의미로 사용되게 된다.

## 방향

2차원 벡터에서 방향은 피타코라스 정리를 이용하여 쉽게 구할 수 있다.

유저 A의 위치가 1,2이고, 유저 B의 위치가 4,8일때, 

![](images/Pasted%20image%2020250604120150.png)

$f^2$ + $g^2$ = $h^2$ 이라는 식으로 A에서 B로 향하는 방향을 구할 수 있다.

다만 3차원 벡터에서는 방향 구하기가 복잡해진다.
![](images/Pasted%20image%2020250604120452.png)

그러므로, 벡터를 이용해 방향을 구할 수 있다는 것을 알아두면 좋을것 같다.

## 벡터 크기(magnitude)

위의 위치와 방향으로 이어진 선분 h가 벡터의 크기가 된다.
$\overrightarrow{A,B} = <4,8>$ 

이렇듯 2차원에서는 간단하게 구해지지만, 
3차원에서는 3개의 축으로 인해 크기를 구하기 힘들다.

이럴때 사용되는게 magnitude이다.
3차원 공간에서 두 점 사이의 벡터의 차이를 계산후 magnitude를 사용해주면
3차원 공간의 두 점사이의 벡터 크기를 구할 수 있게 된다.

```cs
Vector3 A = new Vector3(4, 8, 7)
Vector3 B = new Vector3(3, 10, 5)
float magnitude = (A - B).magnitude
```

혹은 속도의 계산에도 사용할 수 있다.

```cs
Vector3 velo = new Vectore(1, 2, 3);
float magVelo = velo.magnitude;
```

[Vector3.magnitude](https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector3-magnitude.html)

**벡터의 크기는 거리 측정, 속도 계산, 방향 판단 등에서 사용된다**

>magnitude는 $\sqrt{(x^2 + y^2 + z^2)}$ 이다.
>sqrMagnitude는 제곱근을 구하기 전, 즉 $x^2 + y^2 + z^2$ 의 값이므로, 
>단순한 거리의 비교만 필요한 경우 sqrt연산을 하지 않는 sqrMagnitude를 이용하여 최적화 가능하다
>![](images/Pasted%20image%2020250604123330.png)
>
>[Vector3.sqrMagnitude](https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector3-sqrMagnitude.html)

### normalized

normalized는 magnitude에서 계산된 거리나 속도가 일정하지 않을때 벡터의 크기를 정규화 시켜줄때 사용하게 된다.
[Vector3.noramlized](https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector3-normalized.html)

구현부는 다음과 같이 되어있다.
![](images/Pasted%20image%2020250604123643.png)

>noramlized된 벡터는 1의 크기를 가지게 되고 현재 벡터의 방향은 유지된다.
>Vector3의 값을 해당 Vector3의 magnitude된 값으로 나눈 값을 의미한다.
>>예를들어 Vector3 = (2,2,1)일경우, magnitude는 3이 되므로,  
>>(2/3, 2/3, 1/3)의 값을 가지게 된다.
>>이후에 magnitude로 속도나 크기를 계산하려고 하면
>>$\sqrt{(\frac{2}{3})^2 +(\frac{2}{3})^2 + (\frac{1}{3})^2} = 1$, 즉 1의 크기를 가지게 된다.

```cs
using UnityEngine;  
  
public class Test : MonoBehaviour  
{  
    private Vector3 point = new Vector3(1, 0, 0);  
    private Vector3 diagonalPoint = new Vector3(2, 2, 1);  
      
    void Start()  
    {  
        Debug.Log($"point: {point.magnitude}");  
        Debug.Log($"diagonalPoint: {diagonalPoint.magnitude}");  
        Debug.Log($"normalized Point: {point.normalized.magnitude}");  
        Debug.Log($"normalized DiagonalPoint: {diagonalPoint.normalized.magnitude}");  
    }  
}
```

이런 코드로 normalized를 실험해보면

![](images/Pasted%20image%2020250604124817.png)
이런 결과가 나오게 된다.

>2차원 벡터를 기준으로, 유저가 점프를 했다고 가정해보자
>(0,0)인 좌표에서 (1,1)이라는 좌표로 점프를 했을때, 플레이어가 좌우로 움직인 힘은 x축으로 1만큼의 벡터크기 이지만, 
>점프된 힘은 피타고라스 정리를 이용하여 $\sqrt{1^2 + 1^2}$ 가 되므로, 1.414213....이 되게 된다.
>따라서 이러한 경우, 각 좌표의 속력이 다르기 때문에, normalized를 해주어 결과가 1로 수렴하게 힘이나 속도를 조절해주면 된다.

