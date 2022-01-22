const { AppError } = require('../../common/errors/AppError');
const cloudinary = require('cloudinary');
const Product = require('../../models/productModel').Product;
const successRes = require('../../common/utils/Response').successRes;

module.exports = {
    uploadThumbnail: async (path, name) => {
        let ret = 'error';

        await cloudinary.v2.uploader.upload(path, { public_id: name }, (error, result) => {
            if (error) next(new AppError(500, 'Upload failed'));
            else ret = result.secure_url;
        });

        return ret;
    },
    uploadItem: async (userID, title, description, price, amount, imageUrl) => {
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
                next(new AppError(500, "Can't upload item"));
            });

        delete successRes.data;

        return successRes;
    },
    getAllItems: async () => {
        await Product.find({})
            .then((res) => (successRes.data = res))
            .catch((err) => {
                next(new AppError(500, "Can't get items"));
            });

        return successRes;
    },
    getItemsByName: async (name) => {
        await Product.find({
            title: {
                $regex: name,
            },
        })
            .then((res) => (successRes.data = res))
            .catch((err) => {
                next(new AppError(500, "Can't get items"));
            });
        return successRes;
    },
    getItemDetail: async (id) => {
        await Product.find({
            _id: id,
        })
            .then((res) => {
                successRes.data = res;
                // 404
            })
            .catch((err) => {
                next(new AppError(500, "Can't get item detail"));
            });
        return successRes;
    },
};
