import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import UsersComp from './UsersComp';
import AddUserComp from './AddUserComp';
import { UsersContext } from '../contexts/UsersContext';
import EditUserComp from './EditUserComp'

function ManageUsersPlaceHolder(props) {


  return (<div>

    <Switch>
      <Route exact path="/mainPage/manageUsers" component={UsersComp} />
      <Route path="/mainPage/manageUsers/addUser" component={AddUserComp} />
      <Route path="/mainPage/manageUsers/editUser/:id" component={EditUserComp} />
    </Switch>


  </div>)
}

export default ManageUsersPlaceHolder;