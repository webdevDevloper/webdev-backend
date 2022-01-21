const e = require('express')
const cartService = require('./cart.service')

module.exports = {
    getItems: async (req, res, next) => {
        try {
            let DTO = await cartService.getItems()

            res.status(200).json(DTO)
        } catch (error) {
            next(error)
        }
    },
    updateItem: async (req, res, next) => {
        try {
            let DTO = await cartService.updateItem(req.body)

            res.status(200).json(DTO)
        } catch (error) {
            next(error)
        }
    },
    addItem: async (req, res, next) => {
        try {
            let DTO = await cartService.addItem(req.body)

            res.status(200).json(DTO)
        } catch (error) {
            next(error)
        }
    },
    getTotal: async (req, res, next) => {
        try {
            let DTO = await cartService.getTotal()

            res.status(200).json(DTO)
        } catch (error) {
            next(error)
        }
    },
}
