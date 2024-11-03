import React, { useContext} from "react";
import headerStyle from '../style/header.module.scss'
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import MyInput from "../UI/input/myInput";
import MyButton from "../UI/button/myButton";

const Header = () =>{
    const {isAuth} =useContext(AuthContext);
    const navigate = useNavigate()
    const handlePathClick = () =>{
        if (isAuth){
            navigate('/profile')
        }else{
            navigate('/signUp')
        }
    }
    return(
        <header className={headerStyle.container_header}>
            <div className={headerStyle.logo}>SH.</div>
            <div className={headerStyle.serchForm}>
                <MyInput type="text" placeholder="..."/>
                <MyButton>search</MyButton>
            </div>
            <div className={headerStyle.userForm} >
                <MyButton className={headerStyle.like}>like</MyButton>
                <MyButton className={headerStyle.cart}> cart</MyButton>
                <MyButton onClick={handlePathClick} className={headerStyle.profile}>pro</MyButton>
            </div>
        </header>
    )
}
export default Header