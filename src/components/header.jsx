import React, { useContext} from "react";
import headerStyle from './header.module.scss'
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";

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
        <header className={headerStyle.header}>
            <div className={headerStyle.container_header}>
                <div className={headerStyle.logo}>SH.</div>
                <div className={headerStyle.serchForm}>
                    <input type="text" placeholder="..."/>
                    <button>search</button>
                </div>
                <div className={headerStyle.userForm} >
                    <div className={headerStyle.like}>like</div>
                    <div className={headerStyle.cart}> cart</div>
                    <div onClick={handlePathClick} className={headerStyle.profile}>pro</div>
                </div>
            </div>
        </header>
    )
}
export default Header