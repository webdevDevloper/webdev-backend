const dotenv = require('dotenv').config();

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'webdev-studio',
    api_key: '432472271579994',
    api_secret: process.env.CLOUDINARY_KEY,
});

module.exports = {
    uploadThumbnail: async (path, name) => {
        let ret = 'error';

        await cloudinary.v2.uploader.upload(path, { public_id: name }, (error, result) => {
            if (error) return next(new Error('err'));
            else ret = result.secure_url;
        });

        return ret;
    },
};
