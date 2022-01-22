const AppError = require('./appError')

exports.userPermission = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new AppError(403, 'You do not have permission to perform this action')
        }
        next()
    }
}
