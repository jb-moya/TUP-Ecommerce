const mockPool = {
    getConnection: () => {
        // Mock implementation of getConnection
        return new Promise((resolve, reject) => {
            // Simulate successful connection
            const mockConnection = {
                release: () => {}, // Mock implementation of release
                query: async (query) => {
                    // Mock implementation of query
                    return [
                        { id: 1, name: "Mock Record 1" },
                        // { id: 2, name: "Mock Record 2" },
                    ];
                },
            };
            resolve(mockConnection);
        });
    },
};

export default mockPool;