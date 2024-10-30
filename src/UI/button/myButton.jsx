import React from "react";
import style from './myButton.module.scss'

const MyButton = ({ ...props}) =>{
    return(
        <button {...props} className={style.myBtn}></button>
    )
}

export default MyButton;