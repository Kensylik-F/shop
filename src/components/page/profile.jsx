import React from "react";


const Profile = () =>{
    const userInfo = JSON.parse(localStorage.getItem('user'))
    console.log("biba:", userInfo)
    return(
        <div>
            hello {userInfo.name}, {userInfo.lastName}
        </div>
    )
}

export default Profile