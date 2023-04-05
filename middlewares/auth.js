const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{
    try {
        //check ac token
        
        //validate
        //success
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
}