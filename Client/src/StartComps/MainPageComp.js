import React, { useState } from 'react'
import MenuPlaceHolder from '../Menu/MenuPlaceHolder';



export function MainPageComp(props) {

    const toManageUsers = () => {
        props.history.push("/mainPage/manageUsers")
    }
    let userJSON = sessionStorage.getItem("user");
    let user = JSON.parse(userJSON);
    let manageUsersBTN = <input type="button" value="Manage Users" onClick={toManageUsers} />;
    if (user.isAdmin === false) {
        manageUsersBTN = null;
    }
    /// here if the user log out i stop the session time out timer 
    const logOut = () => {
        let timeOut = window.sessionStorage.getItem("timer");
        window.clearTimeout(timeOut)
        props.history.push("/");
    }
    const toMovies = () => {
        props.history.push("/mainPage/movies")
    }
    const toSubscriptions = () => {
        props.history.push("/mainPage/subscriptions");
    }
    let moviesBTN;
    if (user.permissions.includes("view movies")) {
        moviesBTN = <input type="button" value="Movies" onClick={toMovies} />;

    }
    let subsBTN;
    if (user.permissions.includes("view subscriptions")) {
        subsBTN = <input type="button" value="Subscriptions" onClick={toSubscriptions} />;
    }


    return (<div>
        <h3 style={{ color: "blue" }}>Hey {user.firstName} {user.lastName}</h3>
        {moviesBTN}
        {subsBTN}
        <input type="button" value="Log-Out" onClick={logOut} />
        {manageUsersBTN}

        <MenuPlaceHolder />
    </div>)
}