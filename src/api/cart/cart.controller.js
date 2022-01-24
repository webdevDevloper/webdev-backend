const cartService = require('./cart.service');

module.exports = {
    getItems: async (req, res, next) => {
        try {
            let DTO = await cartService.getItems(req.user.id);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateItem: async (req, res, next) => {
        try {
            let DTO = await cartService.updateItem(req.body, req.user.id);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    addItem: async (req, res, next) => {
        try {
            let DTO = await cartService.addItem(req.body, req.user.id);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getTotal: async (req, res, next) => {
        try {
            let DTO = await cartService.getTotal(req.user.id);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
