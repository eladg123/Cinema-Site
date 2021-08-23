const { json } = require('express')
const jsonfile = require('jsonfile')
const permissionsPath = './permissions.json'


///get all
exports.getAllPermissions= ()=>{
    return new Promise((resolve,reject)=>{
        jsonfile.readFile(permissionsPath,(err,data)=>{
            if(err){reject(err)}
            else{resolve(data)}
        })
    })
}



/// get by id
exports.getPremissionById = (id)=>{
    return new Promise((resolve,reject)=>{
        jsonfile.readFile(permissionsPath,(err,data)=>{
            if(err){reject(err)}
            else{
                let userPermissions = data.filter(userPermissions=> userPermissions._id== id);
                resolve(userPermissions[0]);
            }
        })
    })
}


/// add premission
exports.addPermission = async(obj)=>{
    let allPermissions = await this.getAllPermissions();
    let newPermission = {
        _id: obj._id,
        permissions: obj.permissions
    }
    allPermissions.push(newPermission);
    return new Promise((resolve,reject)=>{
        jsonfile.writeFile(permissionsPath,allPermissions,err=>{
            if(err){reject(err)}
            else{resolve(newPermission)}
        })
    })
}


//update permission
exports.updatePermission = (id,obj)=>{
    return new Promise((resolve,reject)=>{
        jsonfile.readFile(permissionsPath,(err,data)=>{
            if(err){reject(err)}
            else{
                let updatedPermission = {
                    _id: id,
                    permissions: obj.permissions
                }
                let updatedPermissions = data.map(permission=>{
                    if(permission._id == id){ return updatedPermission}
                    else{return permission}
                })
                data = updatedPermissions;
                jsonfile.writeFile(permissionsPath,data,err=>{
                    if(err){reject(err)}
                    else{resolve("Permissions Updated!")}
                })
            }
        })
    })
  
}



///delete permission
exports.deletePermission = async(id)=>{
 let allPermissions = await this.getAllPermissions();
 let index = allPermissions.findIndex(permission=> permission._id == id);
 allPermissions.splice(index,1);
 return new Promise((resolve,reject)=>{
     jsonfile.writeFile(permissionsPath,allPermissions,err=>{
         if(err){reject(err)}
         else{resolve("Permissions deleted!")}
     })
 })
}