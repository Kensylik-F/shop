import React, { useState } from "react";
import headerStyle from './header.module.scss'

const Header = () =>{
    const [isOpen, setIsOpen] = useState(false)
    const modalStyle = [headerStyle.modal]

    if(isOpen){
        modalStyle.push(headerStyle.active)
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
                    <div className={modalStyle.join(' ')} onClick={() => setIsOpen(true)}>
                        { isOpen ?(
                            <form action="" onClick={() => setIsOpen(false)}>
                                <input type="text" />
                                <input type="text" />
                                <button>sub</button>
                            </form>
                        )  : 
                        <div>pro</div>

                        }</div>
                </div>
            </div>
        </header>
    )
}
export default Header