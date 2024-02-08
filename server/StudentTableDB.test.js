import StudentTableDB from "./StudentTableDB.js";
import signUpRouteHandler from "./routes/SignUpRoute.js";
import supertest from "supertest";
import express from "express";
import app from "./server.js";

// jest.mock("./routes/SignUpRoute.js");

// describe("SignUpRoute", () => {
//     beforeEach(() => {
//         // Reset the mock implementation before each test
//         signUpRouteHandler.mockClear();
//     });

//     test.only("should handle signup route", async () => {
//         // Mock the behavior of signUpRouteHandler
//         signUpRouteHandler.mockImplementation((db) => {
//             const router = express.Router();
//             router.post("/signup", (req, res) => {
//                 // Mock the behavior of the route for testing
//                 res.status(200).json({ success: true });
//             });
//             return router;
//         });

//         // Your test code
//         const response = await supertest(app).post("/signup").send({
//             student_id: "123",
//             name: "John Doe",
//             email_address: "john.doe@example.com",
//             contact: "1234567890",
//             password: "password123",
//         });

//         // Your assertions
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({ success: true });

//         // Verify the function was called
//         expect(signUpRouteHandler).toHaveBeenCalled();
//     });
// });

describe("StudentTableDB", () => {
    describe("getDBConnection", () => {
        test("should set the provided database connection", () => {
            const mockDB = {};
            StudentTableDB.getDBConnection(mockDB);
            expect(StudentTableDB.db).toBe(mockDB);
        });
    });

    describe("validation of existing data", () => {
        const email = "@gmail.com";
        const studentId = 1;
        const contact = "1234567890";
        const name = "John";
        const password = "hashedPassword";

        beforeEach(() => {
            StudentTableDB.students = [
                {
                    studentId: studentId,
                    name: name,
                    email_address: email,
                    contact: contact,
                    password: password,
                },
            ];
        });
    
        test("should have atleast one student", () => {
            expect(StudentTableDB.students.length).toBeGreaterThan(0);
        });
 
        test("should return true for all variable existence", () => {
            expect(StudentTableDB.validateEmailExistence(email)).toEqual(true);
            expect(
                StudentTableDB.validateStudentIdExistence(studentId)
            ).toEqual(true);
            expect(StudentTableDB.validateContactExistence(contact)).toEqual(
                true
            );
            expect(StudentTableDB.validateNameExistence(name)).toEqual(true);
        });

        test("should be inserted successfully", () => {
            const response = StudentTableDB.getStudent(studentId);
        });
    });
});
