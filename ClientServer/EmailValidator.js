export class EmailValidator {
    static MIN_USERNAME_LENGTH = 1;
    static MAX_USERNAME_LENGTH = 255;

    static MIN_DOMAIN_NAME_LENGTH = 3;
    static MAX_DOMAIN_NAME_LENGTH = 255;

    static MIN_DOMAIN_EXTENSION_LENGTH = 2;
    static MAX_DOMAIN_EXTENSION_LENGTH = 4;

    static errorMessage = {
        containLettersAndNumbers: "only letters (a-z), numbers (0-9), and periods (.) are allowed",
    };

    static isValidText(text, fieldName, errorMessage) {
        if (/[^a-zA-Z0-9.]/.test(text)) {
            throw new Error(`Invalid ${fieldName}. ${errorMessage}`);
        }
    }

    static isValidCharacter(character, fieldName, errorMessage) {
        if (/[^a-zA-Z0-9]/.test(character)) {
            throw new Error(`Invalid ${fieldName}. ${errorMessage}`);
        }
    }

    static validateLength(value, minLength, maxLength, fieldName) {
        if (value === '' || value === undefined || value === 'undefined') {
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
        if (!EmailValidator.isValidText(value)) {
            throw new Error(
                `Invalid ${fieldName}. ${errorMessage ? errorMessage : ""}`
            );
        }
    }

    static validateConsecutiveDots(value, fieldName) {
        if (/\.{2,}/.test(value)) {
            throw new Error(`Consecutive dots are not allowed in ${fieldName}`);
        }
    }

    static validateEmailUsername(username) {
        EmailValidator.validateLength(
            username,
            EmailValidator.MIN_USERNAME_LENGTH,
            EmailValidator.MAX_USERNAME_LENGTH,
            "Username"
        );

        EmailValidator.isValidText(
            username,
            "Username",
            EmailValidator.errorMessage.containLettersAndNumbers
        );

        EmailValidator.isValidCharacter(
            username.charAt(0),
            'first character',
            EmailValidator.errorMessage.containLettersAndNumbers
        );

        EmailValidator.isValidCharacter(
            username.charAt(username.length - 1),
            'last character',
            EmailValidator.errorMessage.containLettersAndNumbers
        );

        EmailValidator.validateConsecutiveDots(username, "username");
    }
}

export class TUPEmailValidator {
    static EMAIL_VALIDATOR;

    static ACCEPTABLE_TUP_DOMAINS = ["tup.edu.ph"];

    static setValidator(validator) {
        TUPEmailValidator.EMAIL_VALIDATOR = validator;
    }

    static validateTUPdomain(domain) {
        if (!TUPEmailValidator.ACCEPTABLE_TUP_DOMAINS.includes(domain)) {
            throw new Error(`Invalid domain`);
        }
    }

    static validateTUPEmail(email) {
        const [username, domain] = email.split("@");

        try {
            EmailValidator.validateEmailUsername(username);
            TUPEmailValidator.validateTUPdomain(domain);
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }
}
