const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);

const error = (res, message = "Oops! Something went wrong!") => responseWithData(res, 500, {
    status: "Failed",
    message
});

const badRequest = (res, message = "Bad Request") => responseWithData(res, 400, {
    status: "Failed",
    message
});

const ok = (res, data) => responseWithData(res, 200, {
    status: "Success",
    data
});

const created = (res, data) => responseWithData(res, 201, {
    status: "Success",
    data
});

const unauthorized = (res, message = "Unauthorized access") => responseWithData(res, 401, {
    status: "Failed",
    message
});

const forbidden = (res, message = "Forbidden") => responseWithData(res, 403, {
    status: "Failed",
    message
});

const notFound = (res, message = "Resource not found") => responseWithData(res, 404, {
    status: "Failed",
    message
});

module.exports = {
    error,
    badRequest,
    ok,
    created,
    unauthorized,
    forbidden,
    notFound
};
