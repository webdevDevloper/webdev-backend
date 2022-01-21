const db = require('../../models/db.json')

const { AppError } = require('../../common/errors/AppError')
module.exports = {
    addItem: async ({ itemId, amount }) => {
        try {
            // const userId = await;
            // const user = db.users.filter((user) => user.Id === userId);
            if (user.length === 1) {
                user[0].itemPurchase.push({ itemId, amount })
                return {
                    error: true,
                    msg: 'Item added successfully',
                }
            }
            throw new AppError(401, 'Invalid user')
        } catch (error) {
            throw new AppError(500, error.message)
        }
    },
    getItems: async () => {
        try {
            // const userId = await;
            // const user = db.users.filter((user) => user.Id === userId);
            if (user.length === 1) {
                return {
                    itemsPurchase: user[0].itemsPurchase,
                }
            }
            throw new AppError(401, 'Invalid user')
        } catch (error) {
            throw new AppError(500, error.message)
        }
    },
}
