import mongoose from 'mongoose';
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'email already exist',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    created:{
        type: Date,
        default: Date.now
    },
    updated: Date,
    hash_pass:{
        type: String,
        required: 'Password is required'
    },
    salt: String,
})

UserSchema
.virtual(password)
.set(function(password){
    this._password = password
    this.salt = this.makeSalt()
    this.hash_pass = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

UserSchema.methods = {
    authenticate: function(plaintext) {
        return this.encryptPassword(plaintext) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto
            .createHmac('sha1', this.salt) 
            .update(password)
            .disgest('hex')
        }catch(err){
            return ''
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}
UserSchema.path('hash_pass').validate(function(){
    if(this._password && this._password.length < 8){
        this.invalidate('password', 'Password must be at least 8 characters.')
    }
    if(this.isNew && !this._password){
        this.invalidate('password', 'Password is required')
    }
}, null)

export default mongoose.model('user', UserSchema);