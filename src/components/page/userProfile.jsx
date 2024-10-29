import React, { useEffect, useState } from "react";
import formStyle from './user.module.scss'

const UserProfile = () =>{
    const [isAuth, setIsAuth] =useState(true);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('email не может быть пустым')
    const [passwordError, setPasswordError] = useState('password не может быть пустым')
    const [emailFill, setEmailFill] = useState(false)
    const [passwordFill, setPasswordFill] = useState(false)

    const [validForm, setValidForm] =useState(false)


     useEffect(()=>{
        if(emailError || passwordError){
            setValidForm(false)
        }else{
            setValidForm(true)
        }
   },[emailError, passwordError])
        
    const blurForm = (e) =>{
        switch(e.target.name){
            case 'email': setEmailFill(true)
            break;
            case 'password': setPasswordFill(true)
            break;
            default:break;
        }
    }

    const validEmail = (e) =>{
        setEmail(e.target.value)
        const pattern =/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if(!pattern.test(String(e.target.value).toLowerCase())){
            setEmailError('неккоректный ввод')
        }else{
            setEmailError('')
        }
    }

    const validPass = (e) =>{
        setPassword(e.target.value);
        if(e.target.value.length < 3){
            setPasswordError('короткий пароль')
        }else{
            setPasswordError('')
        }
    }
    const handleClickLog = (e) =>{
        e.preventDefault()
        setIsAuth(true)
    }
    const handleClickSign = (e) =>{
        e.preventDefault()
        setIsAuth(false)
    }
    return(
        <div className={formStyle.main_form}>
            <form className={formStyle.container_form}>
                <div>
                    <button onClick={handleClickLog}>
                    Log In
                    </button>
                    <button onClick={handleClickSign}>
                    Sign Up
                    </button>
                    
                </div>
                {
                    isAuth ?(
                       <>   {(emailFill && emailError) && <div style={{color:"red"}}>{emailError}</div>}
                            <input
                                onBlur={blurForm} 
                                onChange={(e)=> validEmail(e)}
                                value={email}
                                name='email' 
                                type="text" 
                                placeholder="email"/>
                            {(passwordFill && passwordError) && <div>{passwordError}</div>}
                            <input 
                                onBlur={blurForm} 
                                value={password}
                                onChange={(e) =>validPass(e)}
                                name='password' 
                                type="password" 
                                placeholder="password"/>
                            <button disabled={!validForm} type="submit">login</button>
                       </>
                    )
                    :(
                        <>
                            <input 
                                name='firstname' 
                                type="text" 
                                placeholder="firstname"/> 
                            <input 
                                name='lastname' 
                                type="text" 
                                placeholder="lastname"/>
                            {(emailFill && emailError) && <div>{emailError}</div>}
                            <input 
                                onBlur={blurForm} 
                                name='email' 
                                type="text" 
                                placeholder="email"/>
                            {(passwordFill && passwordError) && <div>{passwordError}</div>}
                            <input 
                                onBlur={blurForm} 
                                name='password' 
                                type="password" 
                                placeholder="password"/>
                            <button type="submit">started</button>
                        </>
                    )
                }
                
            </form>
        </div>
    )
}

export default UserProfile;