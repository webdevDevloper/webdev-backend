const jwt = require('jsonwebtoken');
const itemsService = require('./items.service');
const { AppError } = require('../../common/errors/AppError');

module.exports = {
    getItemsByName: async (req, res, next) => {
        try {
            res.send(await itemsService.getItemsByName(req.query.name, next));
        } catch (err) {
            next(err);
        }
    },
    getAllItems: async (req, res, next) => {
        try {
            const response = (await itemsService.getAllItems(next)) || false;
            if (response) res.send(response);
        } catch (err) {
            next(err);
        }
    },
    getItemDetail: async (req, res, next) => {
        try {
            const response = (await itemsService.getItemDetail(req.params.id, next)) || false;
            if (response) res.send(response);
        } catch (err) {
            next(err);
        }
    },
    uploadItem: async (req, res, next) => {
        try {
            if (!req.file) throw new AppError(404, 'File not found');

            ({ title, description, price, amount } = req.body);

            // Upload thumbnail to Cloudinary
            const imageUrl = (await itemsService.uploadThumbnail(req.file.path, req.file.filename, next)) || false;
            if (!imageUrl) throw new AppError(500, 'Upload failed');

            // Save data to mongodb
            const response =
                (await itemsService.uploadItem(
                    '61d634706a98a61edd42bf45',
                    title,
                    description,
                    price,
                    amount,
                    imageUrl,
                    next,
                )) || false;

            if (response) res.send(response);
        } catch (err) {
            next(err);
        }
    },
};
