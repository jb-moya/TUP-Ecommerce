const mockPool = {
    getConnection: () => {
        // Mock implementation of getConnection
        return new Promise((resolve, reject) => {
            // Simulate successful connection
            const mockConnection = {
                release: () => {}, // Mock implementation of release
                query: async (query, values) => {
                    // Mock implementation of query
                    return [
                        {
                            student_id: 'TUPM-21-1111',
                            name: "admin",
                            email_address: "1@tup.edu.ph",
                            contact_number: "09111111111",
                            password_hash: "1",
                        },
                        // { id: 2, name: "Mock Record 2" },
                    ];
                },
            };
            resolve(mockConnection);
        });
    },
};

export default mockPool;
