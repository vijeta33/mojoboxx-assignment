const employeeModel = require('../Models/employeeModel')
const jwt = require("jsonwebtoken");
const ObjectId = require('mongoose').Types.ObjectId;


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.length === 0) return false
    return true;
}


const getemployee = async (req, res) => {
    try {
        const searchemployee = await employeeModel.find()
        if (!searchemployee) {
            return res.status(404).send({ status: false, message: 'employee does not exist' })
        }
        res.status(200).send({ status: true, message: 'employee profile details', data: searchemployee})
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}

const updateemployee = async (req, res) => {
    try {
        const params = req.params.employeeId
        let checkId = ObjectId.isValid(params);
        if (!checkId) {
            return res.status(400).send({ status: false, message: "Please Provide a valid employeeId in path params" });;
        }
        const searchemployee = await employeeModel.findOne({ _id: params })
        if (!searchemployee) {
            return res.status(404).send({ status: false, message: 'employee does not exist' })
        }
        if (req.body.userId != req.employeeId) {

            return res.status(403).send({
                status: false,
                message: "Unauthorized access."
            })
        }
        const updateemployee = await employeeModel.findOneAndUpdate({ employeeId: params }, { name: req.body.name, age: req.body.age, email: req.body.email, password: req.body.password, department: req.body.department }, { new: true })
        res.status(200).send({ status: true, message: 'employee details updated successfully', data: updateemployee });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}


const deleteemployee = async (req, res) => {
    try {
        const params = req.params.employeeId
        let checkId = ObjectId.isValid(params);
        if (!checkId) {
            return res.status(400).send({ status: false, message: "Please Provide a valid employeeId in path params" });;
        }

        const searchprofile = await employeeModel.findOne({ _id: params })
        if (!searchprofile) {
            return res.status(404).send({ status: false, message: 'profile does not exist' })
        }
        if (req.body.userId != req.userId) {

            return res.status(403).send({
                status: false,
                message: "Unauthorized access."
            })
        }
        const deleteemployee = await employeeModel.findOneAndUpdate({ employeeId: params }, { isDeleted: true }, { new: true })
        res.status(200).send({ status: true, message: 'employee details deleted successfully', data: deleteemployee });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}


module.exports.getemployee = getemployee
module.exports.updateemployee = updateemployee
module.exports.deleteemployee = deleteemployee