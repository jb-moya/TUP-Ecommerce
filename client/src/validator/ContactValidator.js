export class ContactValidator {
    static studentIDRegex = /^09\d{9}$/;

    static validate(number) {
        if (!this.studentIDRegex.test(number)) {
            throw new Error("Invalid contact number");
        }
    }
}

export default ContactValidator;