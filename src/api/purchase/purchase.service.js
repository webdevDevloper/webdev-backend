const User = require('../../models/userModel')

const { AppError } = require('../../common/errors/AppError')

module.exports = {
    addItem: async (body) => {
        try {
            let { productId, quantity } = body
            // const userId = await;
            let user = await User.findOne({ id: userId })
            user[0].paid.items.push(body)
            await User.save()
            return {
                error: true,
                msg: 'Item added successfully',
            }
        } catch (error) {
            throw new AppError(500, error.message)
        }
    },
    getItems: async () => {
        try {
            // const userId = await;
            let user = await User.findOne({ id: userId })
            return {
                itemsPurchase: user[0].paid,
            }
        } catch (error) {
            throw new AppError(500, error.message)
        }
    },
}
