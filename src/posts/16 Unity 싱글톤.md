---
id: <%* tR += await tp.user.idIncrement(); %>
title: [Unity] 유니티에서 싱글톤 사용법
subTitle: 싱글톤? 그게뭐야
tag: Unity Csharp GameDev
date: <% tp.date.now("YYYY-MM-DD") %>
---

기본적인 싱글톤은

```cs
using UnityEngine;  
  
public class Managers : MonoBehaviour  
{  
    private static Managers Instance;  
  
    public static Managers GetInstance() { return Instance; }  
  
    void Start()  
    {  
        GameObject go = GameObject.Find("@Managers");  
        Instance = go.GetComponent<Managers>();  
    }  
  
    // Update is called once per frame  
    void Update() { }  
}
```

이런식으로 구현하면 된다.

하지만 문제가 있다.

- 아직 매니저 오브젝트가 존재하지 않는데 다른 오브젝트에서 사용하게되면, 매니저 오브젝트는 null이 되게 됨.

따라서 매니저 오브젝트가
- 존재하면
	- 그냥 찾아서 싱글톤으로 만들어주고
- 존재하지 않으면
	- 매니저 오브젝트를 만들어서 싱글톤으로 만들어주면 된다.

```cs
using UnityEngine;  
  
public class Managers : MonoBehaviour  
{  
    private static Managers s_Instance;  
  
    //1. 
    //Instance프로퍼티를 이용해서 s_Instance에 접근 하기  
    public static Managers Instance  
    {  
        get  
        {  
            Init();  
            return s_Instance;  
        }  
    }  
  
    void Start() {  }  

    void Update() { }  
  
    static void Init()  
    {  
        //2. 
        //프로퍼티의 Init을 통해들어옴  
        if (s_Instance == null)  
        {  
            //2-1. 
            //만약 s_Instance가 null상태이면(첫 로드된 후는 무조건 null),            
            //GameObject의 Find를 이용하여 문자열 비교를 통해  
            //@Managers라는 이름을 가진 GameObject를 찾음  
            GameObject go = GameObject.Find("@Managers");  
              
            //3. 
            //@Managers라는 이름을 가진 GameObject를 찾지 못하면
            //(@Manager라는 게임오브젝트가 Hierarchy에 존재하지 않는 상황)  
            if (go == null)  
            {  
                //4. 
                //직접 @Managers라는 이름을 가진 GameObject를 생성하고, 
                //해당 오브젝트에 AddComponent를 이용해 Managers를 붙힘  
                go = new GameObject() { name = "@Managers" };  
                go.AddComponent<Managers>();  
            }  
  
            //3-1. 
            //@Managers라는 이름을 가진 GameObject가 존재하면, 
            //DontDestroyOnLoad메서드를 이용해 씬 전환시에도 매니저가 파괴되지 않게 막아주고,  
            //s_Instance에 Managers 연결  
            DontDestroyOnLoad(go);  
            s_Instance = go.GetComponent<Managers>();  
        }  
    }  
}
```

이렇게 해서
`s_Instance`는 Managers라는 클래스를 의미하게 된다.