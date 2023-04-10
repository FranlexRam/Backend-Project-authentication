const {Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter your name"],
            trim: true
        },
        email:{
            type: String,
            required: [true, "Please enter your email"],
            trim: true,
            unique: true
        },
        password:{
            type: String,
            required: [true, "Please enter your password"],
            min: 6
        },
        avatar:{
            type: String,
            default: "https://res.cloudinary.com/dqjf3qapu/image/upload/v1681094817/Avatar/Blank_Avatar_rp0irb.svg",
        },
    },
    {timestamp: true}
);

const User = model("User", userSchema);

module.exports = User;