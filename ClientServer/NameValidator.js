export class NameValidator {
    static MIN_NAME_LENGTH = 1;
    static MAX_NAME_LENGTH = 30;

    static validateName(name) {
        try {
            NameValidator.validateLength(
                name,
                NameValidator.MIN_NAME_LENGTH,
                NameValidator.MAX_NAME_LENGTH,
                "Name"
            );

            NameValidator.validateText(name, "Name");
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static validateLength(value, minLength, maxLength, fieldName) {
        if (value === "" || value === undefined) {
            throw new Error(`${fieldName} is required`);
        }
        if (value.length < minLength) {
            throw new Error(
                `${fieldName} must be at least ${minLength} characters long`
            );
        }
        if (value.length > maxLength) {
            throw new Error(
                `${fieldName} must be at most ${maxLength} characters long`
            );
        }
    }

    static validateText(value, fieldName, errorMessage = "") {
        if (!NameValidator.isValidText(value)) {
            throw new Error(
                `Invalid ${fieldName}. ${errorMessage ? errorMessage : ""}`
            );
        }
    }

    static isValidText(value) {
        return /^[a-zA-Z\s]*$/.test(value);
    }
}
