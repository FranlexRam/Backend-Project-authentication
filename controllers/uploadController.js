const cloudinary = require('cloudinary');
const fs = require('fs');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

const uploadController = {
    uploadAvatar: async (req, res) => {
        try {
            
        } catch (err) {
            res.status(500).json({msg: err.message});
        }
    }
}

module.exports = uploadController;