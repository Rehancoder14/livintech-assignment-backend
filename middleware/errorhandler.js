
const {constants} = require("../constants/contant")
const errorHandler = (err,req, res, next)=>{
    const statusCode = res.statusCode? res.statusCode :500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message : err.message,
                stackTrace: err.stackTrace
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not found",
                message : err.message,
                stackTrace: err.stackTrace
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message : err.message,
                stackTrace: err.stackTrace
            });
            break;
        case constants.UNAUTHORISED:
            res.json({
                title: "Unauthorised",
                message : err.message,
                stackTrace: err.stackTrace
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Internal server error",
                message : err.message,
                stackTrace: err.stackTrace
            });
            break;
        default:
            break;
    }
    
};

module.exports = errorHandler;