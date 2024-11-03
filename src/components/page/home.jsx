import React from "react";
import Header from "../header";
import Filter from "../filter";


const HomePage = () =>{
    return(
        <div style={{display:"flex",justifyContent:'center',padding:'15px 150px', flexDirection:"column"}}>
            <Header />
            <Filter/>
        </div>
    )
}

export default HomePage;