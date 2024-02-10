import EmailValidator from "./EmailValidator.js";

describe("UserInfoValidator", () => {
    describe("validateEmailUsername", () => {
        const longUsername = "toolongusername1234567890123456";
        const shortUsername = "abc";
        const invalidFirstCharacter = "_username";
        const invalidLastCharacter = "username_";
        const invalidFirstAndLastCharacter = "_username_";
        const consecutiveDots = "user..name";
        const invalidCharacterInUsername = "xxxx@xxxx";

        test("should throw error if username is too short", () => {
            expect(() =>
                EmailValidator.validateEmailUsername(shortUsername)
            ).toThrow("Username is too short");
        });

        test("should throw error if username is too long", () => {
            expect(() =>
                EmailValidator.validateEmailUsername(longUsername)
            ).toThrow("Username is too long");
        });

        test("should throw error if username has invalid first character", () => {
            expect(() =>
                EmailValidator.validateEmailUsername(invalidFirstCharacter)
            ).toThrow("Invalid first character");
        });

        test("should throw error if username has invalid last character", () => {
            expect(() =>
                EmailValidator.validateEmailUsername(invalidLastCharacter)
            ).toThrow("Invalid last character");
        });

        test("should throw error if username has invalid first and last character", () => {
            expect(() =>
                EmailValidator.validateEmailUsername(invalidFirstAndLastCharacter)
            ).toThrow("Invalid first character");
        });

        test("should throw error if username has consecutive dots", () => {
            expect(() =>
                EmailValidator.validateEmailUsername(consecutiveDots)
            ).toThrow("Consecutive dots are not allowed");
        });

        test("should throw error if username has invalid character", () => {
            expect(() =>
                EmailValidator.validateEmailUsername(invalidCharacterInUsername)
            ).toThrow("Username must contain only letters and numbers");
        });
    });

    describe("validateDomain", () => {
        const shortDomain = "a";
        const invalidFirstCharacter = "-domain";
        const invalidLastCharacter = "domain-";
        const consecutiveDots = "domain..com";

        test("should throw error if domain is too short", () => {
            expect(() => EmailValidator.validateDomain(shortDomain)).toThrow(
                "Domain must be at least 2 characters long"
            );
        });

        test("should throw error if domain has invalid first character", () => {
            expect(() => EmailValidator.validateDomain(invalidFirstCharacter)).toThrow(
                "Invalid first character"
            );
        });

        test("should throw error if domain has invalid last character", () => {
            expect(() => EmailValidator.validateDomain(invalidLastCharacter)).toThrow(
                "Invalid last character"
            );
        });

        test("should throw error if domain has consecutive dots", () => {
            expect(() => EmailValidator.validateDomain(consecutiveDots)).toThrow(
                "Consecutive dots are not allowed"
            );
        });
    });

    describe("validateEmail", () => {
        test("should throw error if email username is invalid", () => {
            expect(() =>
                EmailValidator.validateEmail("invalid@domain.com")
            ).toThrow(
                "Invalid email: Username must contain only letters and numbers"
            );
        });
    });
});
