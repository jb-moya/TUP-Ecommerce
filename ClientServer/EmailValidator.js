export class EmailValidator {
    static MIN_USERNAME_LENGTH = 6;
    static MAX_USERNAME_LENGTH = 30;

    static MIN_DOMAIN_NAME_LENGTH = 2;
    static MAX_DOMAIN_NAME_LENGTH = 254;

    static MIN_DOMAIN_EXTENSION_LENGTH = 2;
    static MAX_DOMAIN_EXTENSION_LENGTH = 4;

    static isValidCharacter(text) {
        return /^[a-zA-Z0-9]$/.test(text);
    }

    static validateLength(value, minLength, maxLength, errorMessage) {
        if (value === undefined) {
            throw new Error(`${errorMessage} is required`);
        }
        if (value.length < minLength) {
            throw new Error(
                `${errorMessage} must be at least ${minLength} characters long`
            );
        }
        if (value.length > maxLength) {
            throw new Error(
                `${errorMessage} must be at most ${maxLength} characters long`
            );
        }
    }

    static validateCharacter(value, errorMessage) {
        if (!EmailValidator.isValidCharacter(value)) {
            throw new Error(`Invalid ${errorMessage}`);
        }
    }

    static validateConsecutiveDots(value, errorMessage) {
        if (/\.{2,}/.test(value)) {
            throw new Error(
                `Consecutive dots are not allowed in ${errorMessage}`
            );
        }
    }

    static validateEmailUsername(username) {
        EmailValidator.validateLength(
            username,
            EmailValidator.MIN_USERNAME_LENGTH,
            EmailValidator.MAX_USERNAME_LENGTH,
            "Username"
        );
        EmailValidator.validateCharacter(
            username,
            "Username must contain only letters and numbers"
        );
        EmailValidator.validateCharacter(
            username.charAt(0),
            "Invalid first character"
        );
        EmailValidator.validateCharacter(
            username.charAt(username.length - 1),
            "Invalid last character"
        );
        EmailValidator.validateConsecutiveDots(username, "username");
    }

    static validateDomain(domain) {
        EmailValidator.validateLength(
            domain,
            EmailValidator.MIN_DOMAIN_NAME_LENGTH,
            EmailValidator.MAX_DOMAIN_NAME_LENGTH,
            "Domain"
        );
        EmailValidator.validateCharacter(
            domain.charAt(0),
            "first character"
        );
        EmailValidator.validateCharacter(
            domain.charAt(domain.length - 1),
            "Invalid last character"
        );
        EmailValidator.validateConsecutiveDots(domain, "domain");
    }

    static validateEmail(email) {
        const [username, domain] = email.split("@");

        try {
            EmailValidator.validateEmailUsername(username);
            EmailValidator.validateDomain(domainName);
        } catch (error) {
            throw new Error(`Invalid email: ${error.message}`);
        }
    }
}

export class TUPEmailValidator {
    // should use function from EmailValidator for email username validation
}