const Subscription = require ('./subscriptionModel');


///getall
const getAllSubscriptions = ()=>{
    return new Promise((resolve,reject)=>{
        Subscription.find({},(err,data)=>{
            if(err){reject(err);}
            else{resolve(data);}
        })
    })
}

/// get by id 
const getSubscriptionById = (id)=>{
    return new Promise((resolve,reject)=>{
        Subscription.findById(id,(err,data)=>{
            if(err){reject(err)}
            else{resolve(data);}
        })
    })
}

/// add subscription
const addSubscription = (newSubscription)=>{
    return new Promise((resolve,reject)=>{
        let subscriptionToCreate = new Subscription ({
            memberId: newSubscription.memberId,
            moviesWatched: newSubscription.moviesWatched
        });
        subscriptionToCreate.save((err)=>{
            if(err){reject(err);}
            else{resolve(subscriptionToCreate);}
        })
    })
}

/// update subscription
const updateSubscription = (subscriptionId,subscriptionToUpdate)=>{
    return new Promise((resolve,reject)=>{
        Subscription.findByIdAndUpdate(subscriptionId,{
            memberId: subscriptionToUpdate.memberId,
            moviesWatched: subscriptionToUpdate.moviesWatched
        },err=>{
            if(err){reject(err)}
            else{resolve("Subscription Updated")}
        })
    })
}


//delete subscription
const deleteSubscription = (subscriptionId)=>{
    return new Promise((resolve,reject)=>{
        Subscription.findOneAndDelete(subscriptionId,err=>{
            if(err){reject(err)}
            else{resolve("Subscription Deleted")}
        })
    })
}

module.exports = {getAllSubscriptions,getSubscriptionById,addSubscription,updateSubscription,deleteSubscription};