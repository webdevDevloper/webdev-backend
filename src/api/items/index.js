const itemsController = require('./items.controller');
const { validate } = require('../../middleware/validate');
const { userPermission } = require('../../middleware/userPermission');
const router = require('express').Router();
const multer = require('multer');
const { AppError } = require('../../common/errors/AppError');
const { whiteList } = require('../../common/utils/AllowedFileTypes');

// Setup multer

const fileFilter = (req, file, cb) => {
    if (!whiteList.includes(file.mimetype)) {
        return cb(new AppError(500, 'File is not allowed'));
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, filename + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter,
});

// Routes

router.get('/', (req, res, next) => {
    !req.query.name ? itemsController.getAllItems(req, res, next) : itemsController.getItemsByName(req, res, next);
});

router.get('/:id', itemsController.getItemDetail);

router.route('/').post(validate, userPermission('admin'), upload.single('thumbnail'), itemsController.uploadItem);

router.get('/catalogue/:category', itemsController.getItemByCategory);
module.exports = router;
