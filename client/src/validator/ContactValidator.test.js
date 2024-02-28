import { ContactValidator } from "./ContactValidator.js";

describe("ContactValidator", () => {
    describe("validateUniqueCredentials", () => {
        it("should throw an error if contact is invalid", () => {
            const invalidContact = [
                "0912345678",
                "1111111111",
            ];

            for (const contact of invalidContact) {
                expect(() =>
                    ContactValidator.validateUniqueCredentials(contact)
                ).toThrow("Invalid student ID");
                console.log("contact: ", contact);
            }
        });

        it("should not throw an error if contact is valid", () => {
            const validContact = [
                "09123456789",
                "09123456788",
                "09199999999",
                "09123456786",
                "09123456785",
                "09123456784",
                "09123456783",
                "09123456782",
                "09123456781",
                "09123456780",
            ];

            for (const contact of validContact) {
                expect(() =>
                    ContactValidator.validateUniqueCredentials(contact)
                ).not.toThrow();
                console.log("contact: ", contact);
            }
        });
    });
});
