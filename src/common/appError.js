class AppError extends Error {
    constructor(statusCode, message) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }

        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;
