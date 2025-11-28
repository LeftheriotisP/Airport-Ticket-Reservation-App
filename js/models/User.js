const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        firstname:{
            type:String,
            required: true
        },
        lastname:{
            type:String,
            required: true
        },
        username:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
        tel:{
            type:String,
            required: true
        },
        trait: {
            type: String,
            required: true
        },
        discountCode:{
            type: String
        },
        uuid: { // unique id for each user
            type: String,
            required: true,
            unique: true 
        }
    },
    {
    versionKey: false //disable __v field
    }
)

module.exports = mongoose.model('users',UserSchema)