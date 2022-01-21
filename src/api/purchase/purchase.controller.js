const purchaseService = require('./purchase.service');

module.exports = {
    addItem: async (req, res, next) => {
        try {
            const DTO = await purchaseService.addItem(req.body, req.user.id);

            res.status(200).json(DTO);
        } catch (error) {
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
};
