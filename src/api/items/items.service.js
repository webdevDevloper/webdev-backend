const { AppError } = require('../../common/errors/AppError');
const cloudinary = require('cloudinary');
const { Product } = require('../../models/productModel');
const { successRes } = require('../../common/utils/Response');

module.exports = {
    uploadThumbnail: async (path, name, next) => {
        let ret = '';
        let runRet = false;

        await cloudinary.v2.uploader.upload(path, { public_id: name }, (error, result) => {
            if (error) next(new AppError(500, 'Upload failed'));
            else {
                ret = result.secure_url;
                runRet = true;
            }
        });

        if (runRet) return ret;
    },
    uploadItem: async (userID, title, description, price, category, imageUrl, next) => {
        let runRet = false;

        const product = new Product({
            userID,
            title,
            description,
            price,
            category,
            imageUrl,
        });

        await product
            .save()
            .then((res) => (runRet = true))
            .catch((err) => {
                next(new AppError(500, "Can't upload item"));
            });

        if (runRet) {
            delete successRes.data;
            return successRes;
        }
    },
    getAllItems: async (next) => {
        let runRet = false;
        await Product.find({})
            .then((res) => {
                successRes.data = res;
                runRet = true;
            })
            .catch((err) => {
                next(new AppError(500, "Can't get items"));
            });
        if (runRet) return successRes;
    },
    getItemsByName: async (name, next) => {
        let runRet = false;
        await Product.find({
            title: {
                $regex: name,
            },
        })
            .then((res) => {
                successRes.data = res;
                runRet = true;
            })
            .catch((err) => {
                next(new AppError(500, "Can't get items by name"));
            });
        if (runRet) return successRes;
    },
    getItemDetail: async (id, next) => {
        let runRet = false;
        await Product.find({
            _id: id,
        })
            .then((res) => {
                if (!Object.keys(res).length) next(new AppError(404, 'Item not found'));
                else {
                    successRes.data = res;
                    runRet = true;
                }
            })
            .catch((err) => {
                next(new AppError(500, "Can't get item detail"));
            });
        if (runRet) return successRes;
    },
    getItemsByCategory: async (category) => {
        try {
            const items = await Product.find({ category });
            return {
                statusCode: 200,
                message: 'Get items successfully',
                data: items,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getCategory: async () => {
        try {
            const category = await Product.find().distinct('category');
            return {
                statusCode: 200,
                message: 'Get items successfully',
                data: category,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
};
