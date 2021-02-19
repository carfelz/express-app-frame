import User from '../models/user'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

//create user
const create = async(req, res) =>{
    const user = new User(req.body)

    try{
        await user.save()
        console.log('created');
        return res.status(200).json({
            message: "Successfully signed up"
        })
        
    }catch(err){
        console.log('not created');
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
    
}

//gets all users
const get = async (req, res) =>{
    try {
        let users = await User.find().select('name email created updated')
        res.json(users)
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}

//get user by id
const getById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if(!user){
            return res.status('400').json({
                error: "User not found"
              })
        }
        req.profile = user;
        next();
    } catch (error) {
        return res.status('400').json({
            error: "Could not retrieve user"
          })
    }
}

//get user w/out sensitive info
const read = async (res, req) =>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

//updates
const update = async(res, req) =>{
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save();
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}

//deletes
const deletes = async(res, req) =>{
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}

export default {
    create,
    get,
    getById,
    read,
    update,
    deletes,

}