//const router = require('./contactRoutes')
//const validToken= require('../middleware/validTokenHHandler')
const {registerUser,loginUser,currentUser}= require('../controllers/userController')
const validToken = require('../middleware/validTokenHHandler')
const router = require('express').Router()

router.post('/register',registerUser)

router.post('/login',loginUser)

router.get('/current',validToken,currentUser)

module.exports=router