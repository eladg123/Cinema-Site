const jsonfile = require('jsonfile')
const usersPath = './users.json'



//get all
exports.getAllUsers = ()=>{
    return new Promise((resolve,reject)=>{
        jsonfile.readFile(usersPath,(err,data)=>{
            if(err){reject(err)}
            else{
                resolve(data)
            }
        })
    })
}
////get by id

exports.getUserById = async(id)=>{
   return new Promise((resolve,reject)=>{
       jsonfile.readFile(usersPath,(err,data)=>{
         if(err){reject(err)}
         else{
             let user = data.filter(user=>user._id == id );
             resolve(user[0]);
         }
       })
      
   })
} 

/// add user

exports.addUser = async(obj) => {
    let newUser = {
        _id: obj._id,
       firstName: obj.firstName,
       lastName: obj.lastName,
       createdDate: obj.createdDate,
       sessionTimeOut: obj.sessionTimeOut
    }
    let allUsers = await this.getAllUsers();
    allUsers.push(newUser);
    return new Promise((resolve,reject)=>{
        jsonfile.writeFile(usersPath,allUsers,err=>{
            if(err){reject(err)}
            else{resolve(newUser)}
        })
    })
}

///update user
exports.updateUser = (id,obj)=>{
    return new Promise((resolve,reject)=>{
        jsonfile.readFile(usersPath,(err,data)=>{
            if(err){reject(err)}
            else{
                let updatedUser = {
                    _id: id,
                    firstName: obj.firstName,
                    lastName: obj.lastName,
                    createdDate: obj.createdDate,
                    sessionTimeOut: obj.sessionTimeOut
                }
                let updatedUsers = data.map(user=>{
                    if(user._id == id){return updatedUser}
                    else{return user}
                })
                data = updatedUsers;
                jsonfile.writeFile(usersPath,data,err=>{
                    if(err){reject(err)}
                    else{resolve("User Updated")}
                })
            }
        })
    })
}

//// delete user

exports.deleteUser = async(id)=>{
    let allUsers = await this.getAllUsers();
    let index = allUsers.findIndex(user=> user._id == id);
    allUsers.splice(index,1);
    return new Promise((resolve,reject)=>{
        jsonfile.writeFile(usersPath,allUsers,err=>{
            if(err){reject(err)}
            else{resolve("User deleted!")}
        })
    })

}