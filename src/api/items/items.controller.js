const jwt = require('jsonwebtoken');
const itemsService = require('./items.service');

module.exports = {
    getItemsByName: (req, res) => {
        res.send('getItemsByName');
    },
    getAllItems: (req, res) => {
        res.send('getAllItems ok');
    },
    getItemDetail: (req, res) => {
        res.send('getItemDetail');
    },
    uploadItem: async (req, res, next) => {
        try {
            if (!req.file) next(new Error('err'));

            ({ iname, description, price, amount } = req.body);

            // Upload thumbnail to Cloudinary
            let thumbnailUrl = await itemsService.uploadThumbnail(req.file.path, req.file.filename);

            res.send(thumbnailUrl);

            //let token = req.headers.authorization.split(' ')[1];
        } catch (err) {
            // err
        }
    },
};
