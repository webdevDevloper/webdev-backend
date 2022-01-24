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

            ({ title, description, price, category } = req.body);

            // Upload thumbnail to Cloudinary
            const imageUrl = (await itemsService.uploadThumbnail(req.file.path, req.file.filename, next)) || false;
            if (!imageUrl) throw new AppError(500, 'Upload failed');

            const userId = req.user.id || '';

            // Save data to mongodb
            const response =
                (await itemsService.uploadItem(userId, title, description, price, category, imageUrl, next)) || false;

            if (response) res.send(response);
        } catch (err) {
            next(err);
        }
    },
    getItemByCategory: async (req, res, next) => {
        try {
            const { category } = req.params;
            // console.log(category);
            const DTO = await itemsService.getItemsByCategory(category);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getCategory: async (req, res, next) => {
        try {
            const DTO = await itemsService.getCategory();

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
