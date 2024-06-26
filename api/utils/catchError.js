const catchError = (fun) => (req, res, next) => {
    Promise.resolve(fun(req, res, next)).catch((error) => next(error));
};

module.exports = catchError;