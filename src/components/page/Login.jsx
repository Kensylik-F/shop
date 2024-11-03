import React, { useContext, useEffect, useState } from "react";
import formStyle from '../../style/user.module.scss'
import { AuthContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import MyInput from "../../UI/input/myInput";
import MyButton from "../../UI/button/myButton";

const Login = () =>{
    const {setIsAuth} =useContext(AuthContext)
    const navigate = useNavigate()
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
        
   const handlersub = (e) =>{
    e.preventDefault()

    const user = JSON.parse(localStorage.getItem('user'))

    if(user && user.email === email && user.password === password){
        setIsAuth(true)
        navigate('/profile')
    }else{
        alert('неправильный ввод')
    }
   }
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
    
    return(
        <div className={formStyle.main_form}>
            <form className={formStyle.container_form} onSubmit={handlersub}>
                    {(emailFill && emailError) && <div style={{color:"red"}}>{emailError}</div>}
                         <MyInput
                             onBlur={blurForm} 
                             onChange={(e)=> validEmail(e)}
                             value={email}
                             name='email' 
                             type="text" 
                             placeholder="email"/>
                         {(passwordFill && passwordError) && <div>{passwordError}</div>}
                        <MyInput 
                             onBlur={blurForm} 
                             value={password}
                             onChange={(e) =>validPass(e)}
                             name='password' 
                             type="password" 
                             placeholder="password"/>
                         
                        <MyButton disabled={!validForm} type="submit">login</MyButton>
                    
                
            </form>
        </div>
    )
}

export default Login;