const dotenv = require('dotenv').config();
const { AppError } = require('../../common/errors/AppError');
const cloudinary = require('cloudinary');
const Product = require('../../models/productModel').Product;
const { mongoose } = require('mongoose');

module.exports = {
    uploadThumbnail: async (path, name) => {
        let ret = 'error';

        await cloudinary.v2.uploader.upload(path, { public_id: name }, (error, result) => {
            if (error) throw new AppError(500, 'Upload failed');
            else ret = result.secure_url;
        });

        return ret;
    },
    uploadItem: async (userID, title, description, price, amount, imageUrl) => {
        const successRes = {
            statusCode: 200,
            message: 'ok',
        };

        const product = new Product({
            userID,
            title,
            description,
            price,
            countInStocks: amount,
            imageUrl,
        });

        await product
            .save()
            .then()
            .catch((err) => {
                throw new AppError(500, "Can't upload item");
            });

        return successRes;
    },
    getAllItems: async () => {
        let response = {};

        await Product.find({})
            .then((res) => (response = res))
            .catch((err) => {
                if (err) {
                    throw new AppError(500, "Can't get items");
                }
            });

        return response;
    },
    getItemsByName: async (name) => {
        let response = {};

        await Product.find({
            title: {
                $regex: name,
            },
        })
            .then((res) => (response = res))
            .catch((err) => {
                if (err) {
                    throw new AppError(500, "Can't get items");
                }
            });

        return response;
    },
    getItemDetail: async (id) => {
        let response = {};

        await Product.find({
            _id: id,
        })
            .then((res) => (response = res))
            .catch((err) => {
                if (err) {
                    throw new AppError(500, "Can't get item detail");
                }
            });

        return response;
    },
};
