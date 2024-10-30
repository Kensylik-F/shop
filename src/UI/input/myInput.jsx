import React from "react";
import style from './myInput.module.scss'

const MyInput = (props) =>{
    return <input className={style.myinput} {...props} />
}

export default MyInput