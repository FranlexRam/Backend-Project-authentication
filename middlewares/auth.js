const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{
    try {
        //check access token
        const token = req.header("Authorization");
        if(!token) return res.status(400).json({msg: "Authetication failed."})

        //validate
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user)=>{
            if(err) return res.status(400).json({msg: "Authetication failed."})
            //success
            req.user = user;
            next();
        })
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
}

module.exports = auth;