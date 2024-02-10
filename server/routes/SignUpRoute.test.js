import express from "express";
import request from "supertest";
import signUpRouteHandler from "./SignUpRoute.js";
import StudentSignUp from "../StudentSignUp.js";
import MockPasswordEncryptor from "../__mocks__/MockPasswordEncryptor.js";

// Mock dependencies
jest.mock("../StudentSignUp.js", () => ({
    initialize: jest.fn(),
    validateUniqueCredentials: jest.fn(),
    createStudent: jest.fn(),
}));

jest.mock("../PasswordEncryptor.js", () => jest.fn());

const app = express();
app.use(express.json());
app.use("/", signUpRouteHandler(null));

describe("POST /signup", () => {
    beforeEach(() => {
        StudentSignUp.createStudent.mockReset();
        StudentSignUp.validateUniqueCredentials.mockReset();
    });

    it("should return 200 and call all functions", async () => {
        const mockRequestData = [
            {
                student_id: "1",
                name: "1",
                email_address: "1",
                contact: "1",
                password_hash: "1",
            },
            {
                student_id: "2",
                name: "2",
                email_address: "2",
                contact: "2",
                password_hash: "2",
            },
            {
                student_id: "3",
                name: "3",
                email_address: "3",
                contact: "3",
                password_hash: "3",
            },
        ];

        for (let i = 0; i < mockRequestData.length; i++) {
            const response = await request(app)
                .post("/signup")
                .send(mockRequestData[i])
                .expect(200);

            expect(response.text).toBe("OK");

            expect(response.status).toBe(200);

            expect(
                StudentSignUp.validateUniqueCredentials
            ).toHaveBeenCalledWith(mockRequestData[i]);

            expect(StudentSignUp.createStudent).toHaveBeenCalledWith(
                mockRequestData[i]
            );
        }

        expect(StudentSignUp.createStudent).toHaveBeenCalledTimes(
            mockRequestData.length
        );

        expect(StudentSignUp.validateUniqueCredentials).toHaveBeenCalledTimes(
            mockRequestData.length
        );
    });

    it("should call initialize with the connection and MockPasswordEncryptor", () => {
        expect(StudentSignUp.initialize).toHaveBeenCalledWith(
            null,
            MockPasswordEncryptor
        );
    });
});
