import React from 'react'
import { useContext, useState } from 'react'
import { UsersContext } from '../contexts/UsersContext'
import axios from 'axios'

export function CreateAccountComp(props) {
    const [users, setUsers] = useContext(UsersContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // here the account that the admin created can create his password with the username from admin
    const createAccount = async () => {
        let userCheck = users.filter((user) => (user.username === username && user.password === ""))
        if (userCheck.length == 1) {
            let newUser = userCheck[0];
            newUser.password = password;
            alert("Account Created");
            await axios.put(`http://localhost:8001/api/users/${newUser._id}`, newUser);
            props.history.push("/");
        }
        if (userCheck.length == 0) {
            alert("You Don't Created By The Admin");
            props.history.push("/");
        }
    }


    return (<div>
        <h3>Create Account Page</h3>
        Username: <input type="text" onChange={e => setUsername(e.target.value)} /> <br></br>
        password: <input type="text" onChange={e => setPassword(e.target.value)} /> <br></br>
        <input type="button" value="Create Account" onClick={createAccount} />  <br />



    </div>)

}

