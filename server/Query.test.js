import Query from "./Query";

// Mock the Query module
jest.mock("./Query", () => {
    return {
        getDBConnection: jest.fn(),
        getAllRecords: jest.fn(),
        getRecord: jest.fn(),
        createRecord: jest.fn(),
        updateRecord: jest.fn(),
        deleteRecord: jest.fn(),
    };
});

// should I leave this as is. Or should I use the MockDatabase.js file?
// should I leave this as is. Or should I use the MockDatabase.js file?
// should I leave this as is. Or should I use the MockDatabase.js file?
// should I leave this as is. Or should I use the MockDatabase.js file?

describe("getRecord function", () => {
    it("should return one record row", async () => {
        const table = "";
        const primaryKeyValues = {
            // Your primary key values here
        };

        // Mock the return value of getRecord
        Query.getRecord.mockResolvedValue([
            {
                // something here
            },
        ]);

        // Call the function
        const result = await Query.getRecord(table, primaryKeyValues);

        console.log("result: ", result);

        // Assert that it returns one record row
        expect(Query.getRecord).toHaveBeenCalledTimes(1);
        expect(Query.getRecord.mock.calls[0][0]).toBe(table);
        expect(Query.getRecord.mock.calls[0][1]).toBe(primaryKeyValues);
        expect(result).toHaveLength(1);
        // Add more assertions as needed to verify the returned record
    });
});
