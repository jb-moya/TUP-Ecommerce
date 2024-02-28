import { NameValidator } from "./NameValidator.js";

describe("NameValidator", () => {
    it("should throw an error when name is empty", () => {
        expect(() => NameValidator.validateName("")).toThrow(
            "Name is required"
        );
    });

    it("should throw an error when name is undefined", () => {
        expect(() => NameValidator.validateName(undefined)).toThrow(
            "Name is required"
        );
    });

    it("should throw an error when name is less than 1 character long", () => {
        expect(() => NameValidator.validateName("")).toThrow(
            "Name is required"
        );
    });

    it("should throw an error when name is more than 30 characters long", () => {
        expect(() =>
            NameValidator.validateName(
                "This is a very long name that is invalid"
            )
        ).toThrow("Name must be at most 30 characters long");
    });

    it("should throw an error when name contains invalid characters", () => {
        expect(() => NameValidator.validateName("John Doe!")).toThrow(
            "Invalid Name"
        );
    });

    it("should not throw an error when name is valid", () => {
        expect(() => NameValidator.validateName("John Doe")).not.toThrow();
    });
});
