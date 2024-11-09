const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data)

const error = (res, message = "Oops! Something went wrong!") => responseWithData(res, 500, {
    statusCode: 500,
    message
})

const badRequest = (res, message = "Bad Request") => responseWithData(res, 400, {
    statusCode: 400,
    message
})

const ok = (res, message, data) => responseWithData(res, 200, {
    statusCode: 200,
    message,
    data
})

const created = (res, message, data) => responseWithData(res, 201, {
    statusCode: 201,
    message,
    data
})

const unauthorized = (res, message = "Unauthorized access") => responseWithData(res, 401, {
    statusCode: 401,
    message
})

const forbidden = (res, message = "Forbidden") => responseWithData(res, 403, {
    statusCode: 403,
    message
})

const notFound = (res, message = "Resource not found") => responseWithData(res, 404, {
    statusCode: 404,
    message
})

module.exports = {
    error,
    badRequest,
    ok,
    created,
    unauthorized,
    forbidden,
    notFound
}
