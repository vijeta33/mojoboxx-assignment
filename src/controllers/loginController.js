const employeeModel = require('../Models/employeeModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.length === 0) return false
    return true;
}


const registerEmployee = async function(req,res){
    try {
        userBody = req.body
        let { name,age, email, password, department } = userBody;

    
        if (!isValid(name || age || email || password || department)) {
            return res.status(400).send({ status: false, message: "Please provide field" });
        }
    
        const isEmailAlreadyUsed = await userModel.findOne({ email });
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} email address is already registered` })
        }
        
        let size = Object.keys(password.trim()).length
        if (size < 8 || size > 15) {
            return res.status(400).send({ status: false, message: "Please provide password with minimum 8 and maximum 14 characters" });;
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const userData = { name,age, email, password, department }
        const dataCreated = await employeeModel.create(userData);
        return res.status(201).send({ status: true, message: 'User created successfully', data: dataCreated });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const login = async (req, res) => {
    try {
        const myEmail = req.body.email
        const myPassword = req.body.password

        let user = await employeeModel.findOne({ email: myEmail});
        if (user) {
            const {_id,name,password} = user
            const validPassword = await bcrypt.compare(myPassword, password);
            if (!validPassword) {
                return res.status(400).send({ message: "Invalid Password" })
            }
            let payload = { userId: _id, email: myEmail };
            const generatedToken = jwt.sign(payload, "mojoboxx");

            res.header('x-api-key', generatedToken);
            return res.status(200).send({
                Message: name + " you have logged in Succesfully",
                userId: user._id,
                token: generatedToken,
            });
        } else {
            return res.status(400).send({ status: false, message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};




module.exports.registerEmployee = registerEmployee
module.exports.login = login


