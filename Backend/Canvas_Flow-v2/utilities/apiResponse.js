class apiResponse {
    constructor(statusCode, data, message = "No Error") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300;
    }
}

export { apiResponse };