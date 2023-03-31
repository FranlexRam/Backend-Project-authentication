const sendMail = require('../helpers/sendMail')
const createToken = require('../helpers/createToken');
const validateEmail = require('../helpers/validateEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { activation } = require('../helpers/createToken');

const userController = {
    register: async (req, res)=>{
        try {
            // get info
            const {name, email, password} =req.body

            // check fields
            if (!name || !email || !password) return res.status(400).json({msg: "Please fill in all fields."})

            // check email
            if(!validateEmail(email)) return res.status(400).json({msg: "Please enter a valid email address."})

            // check user
            const user = await User.findOne({email})
            if(user) return res.status(400).json({msg: "This email is already registered in the system."})

            // check password
            if(password.length < 6) return res.status(400).json({msg: "Password must be at least 6 characters."})

            // hash password
            const salt = await bcrypt.genSalt()
            const hashPassword = await bcrypt.hash(password, salt)

            // create token
            const newUser = {name, email, password: hashPassword}
            const activation_token = createToken.activations(newUser)

            // send emailconst
            const url = `http://localhost:3000/api/auth/activate/${activation_token}`
            sendMail.sendEmailRegister(email, url, "Verify your email")

            // registration success
            res.status(200).json({msg: "Welcome! Please check Your email."})

        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    activate: async(req, res) =>{
        try {
          //get token
            const {activation_token} = req.body;

          //verify token
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN)
            const {name, email, password} = user

          //check user
            const check = await User.findOne({email})
            if(check) return res.status(400).json({msg: "This email is already registered."})

          //add user
            const newUser = new User({
                name, email, password
            })
            await newUser.save()

          //activation success 
            res.status(200).json({msg: 'Your account has been activated, You can now sign in.'})
          
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
};

module.exports = userController;
