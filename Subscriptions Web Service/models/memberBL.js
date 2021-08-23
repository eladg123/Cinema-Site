const Member = require('./memberModel') ///work by the relevant schema
const membersDAL = require('../DALS/membersDAL');

///get all
const getAllMembers = ()=>{
    return new Promise((resolve,reject)=>{
        Member.find({},(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}


///get by id
const getMemberById = (id)=>{
    return new Promise((resolve,reject)=>{
        Member.findById(id,(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}


/// add member
const addMember = (newMember)=>{
    return new Promise((resolve,reject)=>{
        let memberToCreate = new Member ({
            name: newMember.name,
            email: newMember.email,
            city: newMember.city
        });
        memberToCreate.save((err)=>{
            if(err){reject(err);}
            else{resolve(memberToCreate)}
        })
    })
}
/// add members to DB
const addMembersToDB = async()=>{
    let members = await membersDAL.getMembers();
    members = members.data;
    members.map(member=>{let memberToCreate = new Member({
                              name: member.name,
                              email: member.email,
                              city:member.address.city
                              });
               memberToCreate.save((err)=>{
              if(err){console.log(err)};

})})
    
}

///update member
const updateMember = (memberId,memberToUpdate)=>{
    return new Promise((resolve,reject)=>{
        Member.findByIdAndUpdate(memberId,{
            name: memberToUpdate.name,
            email: memberToUpdate.email,
            city: memberToUpdate.city
        },err=>{
            if(err){reject(err);}
            else{resolve("Member Updated")}
        });
    })
}


///delete member
const deleteMember = (memberId)=>{
    return new Promise((resolve,reject)=>{
        Member.findByIdAndDelete(memberId,err=>{
            if(err){reject(err);}
            else{resolve("Member deleted");}
        })
    })
}

module.exports = {getAllMembers,getMemberById,addMember,updateMember,deleteMember,addMembersToDB}