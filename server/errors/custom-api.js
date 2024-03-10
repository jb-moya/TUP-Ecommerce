class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createCustomError = (msg, statusCode) => {
    console.log("createCustomError");
    console.log("createCustomError");
    return new CustomAPIError(msg, statusCode);
};

export { CustomAPIError, createCustomError };
