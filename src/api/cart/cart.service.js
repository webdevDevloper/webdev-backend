const db = require('../../models/db.json')

const { AppError } = require('../../common/errors/AppError')

module.exports = {
    getItems: async () => {
        try {
            // const userId = await;
            let user = db.users.filter((user) => user.id === userId)

            if (user.length == 1) {
                return {
                    cart: user[0].itemsInCart,
                }
            }
            throw new AppError(401, 'Invalid user')
        } catch (error) {
            throw new AppError(500, error.message)
        }
    },
    updateItem: async (body) => {
        try {
            let { itemId, newAmount } = body
            // const userId = await;
            let user = db.users.filter((user) => user.id === userId)

            if (user.length == 1) {
                const item = user[0].itemsInCart.filter((item) => item.id === itemId)
                item.amount = newAmount
            }
            throw new AppError(401, 'Invalid user')
        } catch (error) {
            throw new AppError(500, error.message)
        }
    },
    addItem: async (body) => {
        try {
            let { itemId, newAmount } = body
            // const userId = await;
            let user = db.users.filter((user) => user.id === userId)

            if (user.length == 1) {
                user[0].itemsInCart.push(body)

                return {
                    error: false,
                    msg: 'Add successfully',
                }
            }
            throw new AppError(401, 'Invalid user')
        } catch (error) {
            throw new AppError(500, error.message)
        }
    },
}
