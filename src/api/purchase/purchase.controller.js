const purchaseService = require('./purchase.service');

module.exports = {
    addItem: async (req, res, next) => {
        try {
            const DTO = await purchaseService.addItem(req.body, req.user.id);

            res.status(200).json(DTO);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getItems: async (req, res, next) => {
        try {
            const DTO = await purchaseService.getItems(req.user.id);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getTotal: async (req, res, next) => {
        try {
            console.log(req.user);
            const DTO = await purchaseService.getTotal(req.user.id);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    protect: async (req, res, next) => {
        try {
            await purchaseService.protect(req);
            next();
        } catch (error) {
            // console.error(error);
            next(error);
        }
    },
};
