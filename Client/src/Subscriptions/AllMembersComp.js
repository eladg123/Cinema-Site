import React, { useContext, useEffect } from 'react'
import { MembersContext } from '../contexts/MembersContext';
import axios from 'axios'
import MemberCardComp from './MemberCardComp';


function AllMembersComp(props) {
    const [members, setMembers] = useContext(MembersContext);
    useEffect(async () => {
        let resp = await axios.get("http://localhost:8001/api/members");
        setMembers(resp.data);
    }, [])
    let membersToRender;
    if (members != undefined) {
        membersToRender = members.map(member => {
            return <MemberCardComp key={member._id} member={member} cbk={data => setMembers(data)} />
        })
    }
    return (<div style={{ backgroundColor: "chartreuse" }}>
        <h3>All Members</h3>
        {membersToRender}
    </div>)
}
export default AllMembersComp;