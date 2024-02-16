export class StudentIDValidator {
    static studentIDRegex = /^TUPM-\d{2}-\d{4,5}$/;

    static validateUniqueCredentials(studentID) {
        if (!this.studentIDRegex.test(studentID)) {
            throw new Error("Invalid student ID");
        }
    }
}
