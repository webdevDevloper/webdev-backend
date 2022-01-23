const { AppError } = require('../common/errors/AppError');

exports.userPermission = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(401).json({
                statusCode: 401,
                message: '401_UNAUTHORIZED',
            });
        }
        next();
    };
};
