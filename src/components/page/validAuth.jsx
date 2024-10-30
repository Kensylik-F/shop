import React, { useContext } from "react";
import { AuthContext } from "../../context/context";
import Login from './Login';
import SignUp from './SignUp';



const ValidAuth =()=>{
    const {isAuth} =useContext(AuthContext)
    return isAuth ? <Login/> : <SignUp/>
}

export default ValidAuth