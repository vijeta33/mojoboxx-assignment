const mongoose = require('mongoose')

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)};
    
    

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required:true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    department: {
        type: String,
        required:true
    },
    isDeleted:{
        tye:String,
        default:false
    }

}, { timestamps: true })


module.exports = mongoose.model("employee", employeeSchema)