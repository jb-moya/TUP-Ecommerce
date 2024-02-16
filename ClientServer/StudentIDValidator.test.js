import { StudentIDValidator } from "./StudentIDValidator.js";

describe("StudentIDValidator", () => {
    describe("validateUniqueCredentials", () => {
        it("should throw an error if student_id is invalid", () => {
            const invalidStudentID = [
                "TUPM-21-1",
                "TUPM-21-12",
                "TUPM-21-123",
                "TUPM-21-123456",
                "TUPM-17-1661114",
                "TUPC-17-1664",
                "UPM-00-1664",
            ];

            for (const studentID of invalidStudentID) {
				expect(() => StudentIDValidator.validateUniqueCredentials(studentID)).toThrow("Invalid student ID");
				console.log("studentID: ", studentID);
            }
        });

        it("should not throw an error if student_id is valid", () => {
            const validStudentID = [
                "TUPM-21-1664",
                "TUPM-17-1664",
                "TUPM-17-16611",
                "TUPM-21-16611",
                "TUPM-19-16611",
                "TUPM-00-99999",
                "TUPM-00-9999",
            ];

			for (const studentID of validStudentID) {
				expect(() => StudentIDValidator.validateUniqueCredentials(studentID)).not.toThrow();
				console.log("studentID: ", studentID);
			}
        });
    });
});