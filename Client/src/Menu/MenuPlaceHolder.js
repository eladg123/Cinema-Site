import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import MoviesComp from '../Movies/MoviesComp'
import ManageUsersComp from '../ManageUsers/ManageUsersComp'
import MembersComp from '../Subscriptions/MembersComp'
import { useHistory } from 'react-router';

function MenuPlaceHolder(props) {
    const history = useHistory();
    /// create the session time out timer and save in the session storage, to get access to it
    useEffect(() => {
        let userJSON = sessionStorage.getItem("user");
        let user = JSON.parse(userJSON);
        let minutes = parseInt(user.sessionTimeOut);
        const timeOut = window.setTimeout(() => {
            alert("Session Time Out!")
            history.push("/")
        }, 1000 * minutes * 60)
        window.sessionStorage.setItem("timer", timeOut);
    }

        , [])





    return (<div>

        <Switch>
            <Route path="/mainPage/movies" component={MoviesComp} />
            <Route path="/mainPage/subscriptions" component={MembersComp} />
            <Route path="/mainPage/manageUsers" component={ManageUsersComp} />
        </Switch>

    </div>)
}
export default MenuPlaceHolder;