const jwt = require('jsonwebtoken');

const createToken = {
    activations: (payload)=>{
        return jwt.sign(payload, process.env.ACTIVATION_TOKEN, {expiresIn: "5min"});
    },
};

module.exports = createToken;