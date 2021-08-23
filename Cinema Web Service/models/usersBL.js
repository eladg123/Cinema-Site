const User = require('./userModel');


///get all
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        })
    })
}


///get by id
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        })
    })
}


//add user
const addUser = (newUser) => {
    return new Promise((resolve, reject) => {
        let userToCreate = new User({
            username: newUser.username,
            password: newUser.password
        });
        userToCreate.save((err) => {
            if (err) { reject(err) }
            else { resolve(userToCreate) }
        })
    })
}

///update user
const updateUser = (userId, userToUpdate) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(userId, {
            username: userToUpdate.username,
            password: userToUpdate.password
        }, err => {
            if (err) { reject(err) }
            else { resolve("User Updated") }
        })
    })
}

/// delete user
const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(userId, err => {
            if (err) { reject(err) }
            else { resolve("User Deleted") }
        })
    })
}


module.exports = { getAllUsers, getUserById, addUser, deleteUser, updateUser }