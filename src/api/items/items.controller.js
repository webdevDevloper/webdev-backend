const jwt = require('jsonwebtoken');
const itemsService = require('./items.service');
const { AppError } = require('../../common/errors/AppError');

module.exports = {
    getItemsByName: async (req, res, next) => {
        try {
            res.send(await itemsService.getItemsByName(req.query.name));
        } catch (err) {
            next(err);
        }
    },
    getAllItems: async (req, res, next) => {
        try {
            res.send(await itemsService.getAllItems(res));
        } catch (err) {
            next(err);
        }
    },
    getItemDetail: async (req, res, next) => {
        try {
            res.send(await itemsService.getItemDetail(req.params.id));
        } catch (err) {
            next(err);
        }
    },
    uploadItem: async (req, res, next) => {
        try {
            let token = req.headers.authorization.split(' ')[1] || '';

            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                if (!decoded.admin) throw new Error();
            } catch (err) {
                throw new AppError(401, 'UNAUTHORIZED');
            }

            if (!req.file) throw new AppError(404, 'File not found');

            ({ title, description, price, amount } = req.body);

            // Upload thumbnail to Cloudinary
            let imageUrl = await itemsService.uploadThumbnail(req.file.path, req.file.filename);

            // Save data to mongodb
            const response = await itemsService.uploadItem(
                '61d634706a98a61edd42bf45',
                title,
                description,
                price,
                amount,
                imageUrl,
            );

            res.send(response);
        } catch (err) {
            next(err);
        }
    },
};
