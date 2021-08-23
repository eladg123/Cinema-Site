import React from 'react'
import SubsPlaceHolder from './SubsPlaceHolder'


function SubsComp(props) {
    let userJSON = sessionStorage.getItem("user");
    let user = JSON.parse(userJSON);
    const toAllMembers = () => {
        props.history.push("/mainPage/subscriptions")
    }
    const toAddMember = () => {
        props.history.push("/mainPage/subscriptions/addMember")
    }
    let addBTN;
    if (user.permissions.includes("create subscriptions")) {
        addBTN = <input type="button" value="Add member" onClick={toAddMember} />;
    }

    return (<div style={{ backgroundColor: "palegreen" }}>
        <h1>Subscriptions</h1>
        <input type="button" value="All members" onClick={toAllMembers} />
        {addBTN}

        <SubsPlaceHolder />

    </div>)
}

export default SubsComp;