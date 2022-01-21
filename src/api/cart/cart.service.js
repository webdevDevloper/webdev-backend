const User = require('../../models/userModel')

const { AppError } = require('../../common/errors/AppError')

module.exports = {
    getItems: async () => {
        try {
            // const userId = await;
            let user = await User.findOne({ id: userId })
            return {
                cart: user[0].cart,
            }
        } catch (error) {
            throw new AppError(500, error.message)
        }
    },
    updateItem: async (body) => {
        try {
            let { productId, newQuantity } = body
            // const userId = await;
            let user = await User.findOne({ id: userId })
            let product = user[0].cart.items.findOne({ productId })
            product[0].quantity = newQuantity
            await User.save()
            return {
                error: false,
                msg: 'Update successfully',
            }
        } catch (error) {
            throw new AppError(500, error.message)
        }
    },
    addItem: async (body) => {
        try {
            let { itemId, newAmount } = body
            // const userId = await;
            let user = await User.findOne({ id: userId })
            user[0].cart.items.push(body)
            await User.save()
            return {
                error: false,
                msg: 'Add successfully',
            }
        } catch (error) {
            throw new AppError(500, error.message)
        }
    },
}
