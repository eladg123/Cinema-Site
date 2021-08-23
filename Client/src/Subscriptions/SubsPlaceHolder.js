import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AllMembersComp from './AllMembersComp';
import AddMemberComp from './AddMemberComp';
import { MembersContextProvider } from '../contexts/MembersContext'
import EditMember from './EditMember';
import MemberCardComp from './MemberCardComp';


function SubsPlaceHolder(props) {



    return (<div>

        <Switch>
            <MembersContextProvider>
                <Route exact path="/mainPage/subscriptions" component={AllMembersComp} />
                <Route path="/mainPage/subscriptions/addMember" component={AddMemberComp} />
                <Route path="/mainPage/subscriptions/editMember/:id" component={EditMember} />
                <Route path="/mainPage/subscriptions/:id" component={MemberCardComp} />
            </MembersContextProvider>
        </Switch>


    </div>)
}
export default SubsPlaceHolder;