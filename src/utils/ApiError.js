class ApiError extends Error {
    constructor(
        statusCode,
        message = "An error",
        errors = [],
        stack = ""
    ) {
        super(message); // Call parent class Error with message

        this.statusCode = statusCode;
        this.data = null;
        this.message = message; // ← fixed typo here
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
