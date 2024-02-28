export class StudentIDValidator {
    static studentIDRegex = /^TUPM-\d{2}-\d{4,5}$/;

    static validate(studentID) {
        if (!this.studentIDRegex.test(studentID)) {
            throw new Error("Invalid student ID");
        }
    }
}

export default StudentIDValidator;