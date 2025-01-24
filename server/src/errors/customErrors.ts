
/**
 * Base custom error class extending native Error
 * Provides standardized error handling for HTTP responses for Standardization and Type Safety
 */
export abstract class HttpError extends Error {
    statusCode: number;
    
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        
        // Maintains proper stack trace for derived classes
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/**
 * 400 Bad Request Error
 * Used for validation errors, missing required fields
 */
export class BadRequestError extends HttpError {
    constructor(message: string = 'Bad Request') {
        super(message, 400);
    }
}

/**
 * 401 Unauthorized Error
 * Used for authentication and permission-related issues
 */
export class UnauthorizedError extends HttpError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

/**
 * 403 Forbidden Error
 * Used when user lacks necessary permissions
 */
export class ForbiddenError extends HttpError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}

/**
 * 404 Not Found Error
 * Used when requested resource doesn't exist
 */
export class NotFoundError extends HttpError {
    constructor(message: string = 'Resource Not Found') {
        super(message, 404);
    }
}

/**
 * 409 Conflict Error
 * Used for duplicate entries or conflicting states
 */
export class ConflictError extends HttpError {
    constructor(message: string = 'Conflict') {
        super(message, 409);
    }
}

/**
 * 422 Unprocessable Entity Error
 * Used for semantic errors in request data
 */
export class UnprocessableEntityError extends HttpError {
    constructor(message: string = 'Unprocessable Entity') {
        super(message, 422);
    }
}

/**
 * 500 Internal Server Error
 * Used for unexpected server-side errors
 */
export class InternalServerError extends HttpError {
    constructor(message: string = 'Internal Server Error') {
        super(message, 500);
    }
}