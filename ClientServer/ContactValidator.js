export class ContactValidator {
    static studentIDRegex = /^09\d{9}$/;

    static validateUniqueCredentials(number) {
        if (!this.studentIDRegex.test(number)) {
            throw new Error("Invalid student ID");
        }
    }
}
