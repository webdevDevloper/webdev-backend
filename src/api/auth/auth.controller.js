const authService = require('./auth.service');

module.exports = {
    signup: async (req, res, next) => {
        try {
            let DTO = await authService.signup(req.body);
            res.status(201).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            let DTO = await authService.login(req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    protect: async (req, res, next) => {
        try {
            await authService.protect(req);
            next();
        } catch (error) {
            next(error);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            let DTO = await authService.forgotPassword(req);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            let DTO = await authService.resetPassword(req.body, req.params.token);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            let DTO = await authService.updatePassword(req.user.id, req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
