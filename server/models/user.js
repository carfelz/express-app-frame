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
    hash_pass:{
        type: String,
        required: 'Password is required'
    },
    created:{
        type: Date,
        default: Date.now
    },
    updated: Date,
    salt: String,
})

UserSchema
.virtual('password')
.set(function(password){
    this._password = password
    this.salt = this.makeSalt()
    this.hash_pass = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

UserSchema.path('hash_pass').validate(function(v){
    if(this._password && this._password.length < 8){
        this.invalidate('password', 'Password must be at least 8 characters.')
    }
    if(this.isNew && !this._password){
        this.invalidate('password', 'Password is not required')
    }
}, null)

UserSchema.methods = {
    authenticate: function(plaintext) {
        return this.encryptPassword(plaintext) === this.hash_pass
    },
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto
            .createHmac('sha1', this.salt) 
            .update(password)
            .digest('hex')
        }catch(err){
            return ''
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}
export default mongoose.model('user', UserSchema);