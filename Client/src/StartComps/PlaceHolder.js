
import React from 'react'
import { Route, Switch, Link } from 'react-router'
import { LoginComp } from './LoginComp'
import { CreateAccountComp } from './CreateAccountComp';
import { MainPageComp } from './MainPageComp';
import { UsersContextProvider } from '../contexts/UsersContext'

function PlaceHolder(props) {

  return (
    <div>

      <h1>Movies - Subscriptions Web Site</h1>



      <Switch>
        < UsersContextProvider>
          <Route exact path="/" component={LoginComp} />
          <Route path="/createAccount" component={CreateAccountComp} />
          <Route path="/mainPage" component={MainPageComp} />
        </ UsersContextProvider>
      </Switch>
    </div>
  );
}
export default PlaceHolder;