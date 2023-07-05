const userRoutes = require('express').Router();
const { postUser, loginUser } = require('../controllers/userControllers');
const newUserMiddleware = require('../middlewares/newUserMiddleware');
const tokenValidateMiddleware = require('../middlewares/tokenValidateMiddleware');

const sendMail = require("../utils/sendMail")


userRoutes.post('/', newUserMiddleware, postUser)
userRoutes.post('/login', loginUser)
userRoutes.post('/sendmail', (req, res)=>{
    sendMail()
    res.send("I tried to send a mail. Go to the console and confirm")
})

userRoutes.get("/authorize",tokenValidateMiddleware, (req, res)=>{
    res.json(req.user)
})


module.exports = userRoutes;