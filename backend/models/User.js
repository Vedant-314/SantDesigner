const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: Array,
        default: [],
    },
    orders: {
        type: Array,
        default: [],
    }
},{
    timestamps: true
})

const User = mongoose.model('users',userSchema);
module.exports = User;