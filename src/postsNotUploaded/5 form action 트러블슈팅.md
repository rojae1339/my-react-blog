`onSubmit`이 action까지 되는줄 알고 onSubmit만 사용하고 있었는데 그게 아니었다

action이어야하는 거였음


그래서 일단 모달창 전체를 컴포넌트로 분리해줌

```tsx
'use client';  
  
import EmailInput from '@/app/(auth)/@modal/_component/EmailInput';  
import PasswordInput from '@/app/(auth)/@modal/_component/PasswordInput';  
import Button from '@/_component/Button';  
import React, { useTransition } from 'react';  
import ModalAlly from '@/app/(auth)/@modal/(signin-signup)/_component/ModalA11y';  
import { handleFormSignup } from '@/app/(auth)/@modal/_actions/formSubmitHandler';  
import { useFormErrorStore } from '@/app/(auth)/@modal/_states/errorState';  
  
export default function SignupModal() {  
  
    return (  
        <form            
	        className={'w-full flex flex-col gap-6'}  
            action={/*??*/}  
            noValidate={true}  
        >            
			{/* EMAIL 입력 */}  
            <EmailInput />  
  
            {/* PW 입력 */}  
            <PasswordInput />  
  
            {/*account a11y*/}  
            <ModalAlly />  
  
            {/*continue button*/}  
            <Button  
                type={'submit'}  
                className={  
                    'w-fit px-4 py-2 rounded-md text-white bg-blue-400 ml-auto hover:cursor-pointer hover:bg-sky-300'  
                }  
            >  
                Continue  
            </Button>  
        </form>  
    );  
}
```

전부 클라이언트 컴포넌트이다.

```ts
export const handleFormSignup = async (formData: FormData): Promise<IHandlerReturn> => {  
    const email = formData.get('email');  
    const pw = formData.get('password');  
  
    const result = signupSchema.safeParse({ email: email, password: pw });  
  
    if (!result.success) {  
        // 에러 정보를 클라이언트에 반환  
        const errorMap = result.error.formErrors.fieldErrors;  
        console.log(result.error.formErrors);  
        return {  
            success: false,  
            errors: {  
                email: errorMap.email?.[0],  
                password: errorMap.password?.[0],  
            },  
        };  
    }  
  
    try {  
        await addFormUser({ ...result.data, nickname: '', created_at: new Date() });  
        return { success: true };  
    } catch (e) {  
        console.log(e);  
        return {  
            success: false,  
            errors: {  
                email: '이미 존재하는 이메일입니다.',  
            },  
        };  
    }  
};
```
이렇게 반환타입을 지정해서

```tsx
'use client';  
  
import EmailInput from '@/app/(auth)/@modal/_component/EmailInput';  
import PasswordInput from '@/app/(auth)/@modal/_component/PasswordInput';  
import Button from '@/_component/Button';  
import React, { useTransition } from 'react';  
import ModalAlly from '@/app/(auth)/@modal/(signin-signup)/_component/ModalA11y';  
import { handleFormSignup } from '@/app/(auth)/@modal/_actions/formSubmitHandler';  
import { useFormErrorStore } from '@/app/(auth)/@modal/_states/errorState';  
import { redirect } from 'next/navigation';  
  
export default function SignupModal() {  
    const { setEmailError, setPasswordError } = useFormErrorStore();  
    const [isPending, startTransition] = useTransition();  

	//추가
    const handleSubmit = async (formData: FormData) => {  
        startTransition(async () => {  
            const result = await handleFormSignup(formData);  
  
            if (!result.success) {  
                // Zustand 스토어 업데이트  
                setEmailError(result.errors?.email);  
                setPasswordError(result.errors?.password);  
            } else {  
                alert('온라인 가계부에 오신걸 환영합니다.');  
                redirect('/ledger');  
            }  
        });  
    };  
  
    return (  
        <form            className={'w-full flex flex-col gap-6'}  
            action={handleSubmit}  
            noValidate={true}  
        >            {/* EMAIL 입력 */}  
            <EmailInput />  
  
            {/* PW 입력 */}  
            <PasswordInput />  
  
            {/*account a11y*/}  
            <ModalAlly />  
  
            {/*continue button*/}  
            <Button  
                type={'submit'}  
                className={  
                    'w-fit px-4 py-2 rounded-md text-white bg-blue-400 ml-auto hover:cursor-pointer hover:bg-sky-300'  
                }  
            >  
                Continue  
            </Button>  
        </form>  
    );  
}
```

이렇게 해주면 된다