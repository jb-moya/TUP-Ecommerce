import mockPool from "./__mocks__/MockDatabase.js";

// Example test case using Jest
describe("MockDatabasePool", () => {
    it("should return mock records from the query", async () => {
        const connection = await mockPool.getConnection();
        const records = await connection.query("some query");

        expect(records).toEqual([
            { id: 1, name: "Mock Record 1" },
            // { id: 2, name: "Mock Record 2" },
        ]);
    });
});
