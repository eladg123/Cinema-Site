import React from 'react'
import ManageUsersPlaceHolder from './ManageUsersPlaceHolder'

function ManageUsersComp(props) {


    const toUsersPage = () => {
        props.history.push("/mainPage/manageUsers")
    }
    const AddUserPage = () => {
        props.history.push("/mainPage/manageUsers/addUser")
    }

    return (<div style={{ backgroundColor: "peru" }}>
        <h1>Users</h1>
        <input type="button" value="All Users" onClick={toUsersPage} />
        <input type="button" value="Add User" onClick={AddUserPage} />

        <ManageUsersPlaceHolder />

    </div>)
}
export default ManageUsersComp;