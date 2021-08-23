import React, { useContext } from 'react'
import UserCard from './UserCard'
import { UsersContext } from '../contexts/UsersContext';


function UsersComp(props) {
    const [users, setUsers] = useContext(UsersContext);
    let usersCardsToRender = users.map(user => {
        return (<UserCard key={user._id} user={user} />)
    })



    return (<div>
        {usersCardsToRender}



    </div>)
}

export default UsersComp;