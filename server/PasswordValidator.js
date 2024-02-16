export class PasswordValidator {
    static MIN_PASSWORD_LENGTH = 8;
    static MAX_PASSWORD_LENGTH = 255;

    static validateLength(password) {
        if (password.length < PasswordValidator.MIN_PASSWORD_LENGTH) {
            throw new Error("Password must be at least 8 characters long.");
        }
        if (password.length > PasswordValidator.MAX_PASSWORD_LENGTH) {
            throw new Error("Password must be at most 255 characters long.");
        }
    }
}
