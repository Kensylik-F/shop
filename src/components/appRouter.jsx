import React from "react";
import {BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import HomePage from "./page/home";
import ValidAuth from "./page/validAuth";
import Login from "./page/Login";
import Profile from "./page/profile";

const AppRouter = () =>{

    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signUp" element={<ValidAuth/>}/>
                <Route path="/login" element={<Login />}/> 
                <Route path="/profile" element={<Profile />}/>
            </Routes>
        </Router>
    )
}

export default AppRouter;