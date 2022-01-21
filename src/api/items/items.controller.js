const jwt = require('jsonwebtoken');
const itemsService = require('./items.service');
const { AppError } = require('../../common/errors/AppError');

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
            if (!req.file) throw new AppError(500, 'File not found');

            ({ iname, description, price, amount } = req.body);

            // Upload thumbnail to Cloudinary
            let thumbnailUrl = await itemsService.uploadThumbnail(req.file.path, req.file.filename);

            res.send(thumbnailUrl);

            //let token = req.headers.authorization.split(' ')[1];
        } catch (err) {
            next(err);
        }
    },
};
