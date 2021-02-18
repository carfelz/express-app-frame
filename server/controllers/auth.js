import User from '../models/user'
import jwt from 'jsonwebtoken'
import expressToken from 'express-jwt'
import config from '../../config/config'

const auth = [];

auth.signin = async (req, res) =>{
    try {
        let user = await User.findOne({"email": req.body.email})
        if(!user){
            return res.status('401').json({error: "User not found"})
        }
        if(!user.authenticate(req.body.password)){
            return res.status('401').send({error: "Email and password don't match"})
        }

        const token = jwt.sign({_id: user._id}, config.jwtSecret)

        res.cookie('t', token, {expire: new Date() + 9999})
        
        console.log('signed in')
        return res.json({
            token,
            user:{
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error)
        return res.status('401').json({ error: "Could not sign in" })
    }
}

auth.signout = (req, res) =>{
    res.clearCookies('t')
    console.log('signed out')
    return res.status('200').json({
        message: 'Signed out'
    })
}

auth.requireSignin = (req, res) =>{

}

auth.hasAuthorization = (req, res) =>{

}

export default auth
