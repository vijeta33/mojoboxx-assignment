const express = require('express')
const router = express.Router()

const loginController = require('../Controllers/loginController')
const Middleware=require("../Middleware/Middleware")
const employeeController = require('../Controllers/employeeController')


router.post('/register',loginController.registerEmployee)
router.post('/login',loginController.login)


router.get('/employee',employeeController.getemployee )
router.put('/employee/:employeeId',Middleware.Auth,employeeController. updateemployee)
router.delete('/employee/:employeeId',Middleware.Auth,employeeController.deleteemployee)


module.exports = router

