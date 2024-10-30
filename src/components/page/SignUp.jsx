import React, { useContext, useEffect, useState } from "react";
import formStyle from './user.module.scss'
import { AuthContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import MyInput from "../../UI/input/myInput";
import MyButton from "../../UI/button/myButton";

const SignUp = () =>{
    const { setIsAuth} =useContext(AuthContext);
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [lastName, setLastName] =useState('')
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

    const handleClickName = (e) =>{
        setName(e.target.value)
    } 
    const handleClickLastName = (e) =>{
        setLastName(e.target.value)
    }     
    console.log('name:', name, 'lastname', lastName )
    const blurForm = (e) =>{
        switch(e.target.name){
            case 'email': setEmailFill(true)
            break;
            case 'password': setPasswordFill(true)
            break;
            default:break;
        }
    }
    const handleAuthLogin = (e)=>{
        e.preventDefault()
        const newUser = {name, lastName, email, password}
        localStorage.setItem('user',JSON.stringify(newUser))
        setIsAuth(true)
        navigate('/login')
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
            <form className={formStyle.container_form}>
                <MyInput 
                    onChange={handleClickName}
                    value={name}
                    name='firstname' 
                    type="text" 
                    placeholder="firstname"/> 
                <MyInput
                    onChange={handleClickLastName}  
                    value={lastName}
                    name='lastname' 
                    type="text" 
                    placeholder="lastname"/>
                {(emailFill && emailError) && <div>{emailError}</div>}
                <MyInput 
                    onBlur={blurForm} 
                    onChange={(e) => validEmail(e)}
                    value={email}
                    name='email' 
                    type="text" 
                    placeholder="email"/>
                {(passwordFill && passwordError) && <div>{passwordError}</div>}
                <MyInput 
                    onBlur={blurForm} 
                    onChange={(e) =>validPass(e)}
                    value={password}
                    name='password' 
                    type="password" 
                    placeholder="password"/>
                <MyButton type="submit" disabled={!validForm} onClick={handleAuthLogin}>started</MyButton>
                        
            </form>
        </div>
    )
}

export default SignUp;