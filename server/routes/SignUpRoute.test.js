import supertest from "supertest";
import signUpRouteHandler from "./SignUpRoute.js";
import express from "express";
import { createPool } from "mysql2/promise";

jest.mock("../StudentTableDB.js", () => ({
    ...jest.requireActual("../StudentTableDB.js"),
    getDBConnection: jest.fn(), // Mocking the function
}));

describe("POST / users", () => {
    it("should respond with status 200", async () => {
        // Create a mocked MySQL connection
        const mockConnection = jest.fn();
        createPool.mockReturnValueOnce({
            getConnection: jest.fn(() => Promise.resolve(mockConnection)),
        });
    });
});
