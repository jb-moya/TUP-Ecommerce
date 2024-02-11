import { EmailValidator, TUPEmailValidator } from "./EmailValidator.js";

const errorMessage =
    "only letters (a-z), numbers (0-9), and periods (.) are allowed";

describe(`EmailValidator`, () => {

    describe(`isValidText`, () => {

        const validText = ["a", "a.b", "a.b.c", "a.b.c.d.e", ".a.", "a.", ".a"];

        const invalidText = ["@.", ".@.", "a.@.b", "a.@.", "..b@"];

        test(`should return true if text is valid`, () => {
            for (const text of validText) {
                expect(() =>
                    EmailValidator.isValidText(text, "", errorMessage)
                ).not.toThrow();
            }
        });

        test(`should throw error if text is invalid`, () => {
            for (const text of invalidText) {
                expect(() =>
                    EmailValidator.isValidText(text, "", errorMessage)
                ).toThrow();
            }
        });
    });
    
    describe(`validateLength`, () => {
        test(`should throw error if value is undefined`, () => {
            expect(() =>
                EmailValidator.validateLength(undefined, 1, 10, `Value`)
            ).toThrow(`Value is required`);
        });

        test(`should throw error if value is too short`, () => {
            expect(() =>
                EmailValidator.validateLength(`a`, 2, 10, `Value`)
            ).toThrow(`Value must be at least 2 characters long`);
        });

        test(`should throw error if value is too long`, () => {
            expect(() =>
                EmailValidator.validateLength(`abcdefghijk`, 1, 10, `Value`)
            ).toThrow(`Value must be at most 10 characters long`);
        });
    });

    describe(`consecutive dots`, () => {
        test(`should throw error if value has consecutive dots`, () => {
            expect(() =>
                EmailValidator.validateConsecutiveDots(`a..b`, `Value`)
            ).toThrow(`Consecutive dots are not allowed in Value`);
        });

        test(`should not throw error if value does not have consecutive dots`, () => {
            expect(() =>
                EmailValidator.validateConsecutiveDots(`a.b`, `Value`)
            ).not.toThrow();
        });
    });

    describe(`validateEmailUsername`, () => {
        const longUsername = `aksdhahsldkjfhaslkdjfhaaaadlskdjfhfkljashdflkjashdflkjasdhflkajsdhflkasjdhlaksjdhflkajshdflkjahsdlkfjhaslkdjfhlkasjdhflkasjdhflkjashdlkjfhaskjfhjksadhfshkjflhsdfkljshdjklfhsfkljashfjlkashfjklashjfklahsjklfhasjklfhaslfhsaklfhkalsfhasdhflaskfhasdjkflhsalkdjfh`;
        const shortUsername = ``;
        const invalidFirstCharacter = `_username`;
        const invalidLastCharacter = `f.username_`;
        const invalidFirstAndLastCharacter = `_username_`;
        const consecutiveDots = `user..name`;
        const invalidCharacterInUsername = `xxxx@xxxx`;

        test(`should throw error if username is too short`, () => {
            expect(() =>
                EmailValidator.validateEmailUsername(shortUsername)
            ).toThrow(`Username is required`);
        });

        test(`should throw error if username is too long`, () => {
            expect(() =>
                EmailValidator.validateEmailUsername(longUsername)
            ).toThrow(`Username must be at most 255 characters long`);
        });

        test(`should throw error if username has invalid last character`, () => {
            expect(() =>
                EmailValidator.validateEmailUsername(invalidLastCharacter)
            ).toThrow(
                `Invalid Username. ${errorMessage}`
            );
        });

        test(`should throw error if username has invalid first and last character`, () => {
            expect(() =>
                EmailValidator.validateEmailUsername(
                    invalidFirstAndLastCharacter
                )
            ).toThrow(
                `Invalid Username. ${errorMessage}`
            );
        });

        test(`should throw error if username has consecutive dots`, () => {
            expect(() =>
                EmailValidator.validateEmailUsername(consecutiveDots)
            ).toThrow(`Consecutive dots are not allowed in username`);
        });

        test(`should throw error if username has invalid character`, () => {
            expect(() =>
                EmailValidator.validateEmailUsername(invalidCharacterInUsername)
            ).toThrow(
                `Invalid Username. ${errorMessage}`
            );
        });
    });
});

describe(`TUPEmailValidator`, () => {
    describe(`validateTUPEmail`, () => {
        test(`should not throw any error`, () => {
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`invalid@tup.edu.ph`)
            ).not.toThrow();
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`jbvhert.moya@tup.edu.ph`)
            ).not.toThrow();
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`john@tup.edu.ph`)
            ).not.toThrow();
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`papa.mama.ate@tup.edu.ph`)
            ).not.toThrow();
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`1@tup.edu.ph`)
            ).not.toThrow();
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`abc@tup.edu.ph`)
            ).not.toThrow();
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`ABCD@tup.edu.ph`)
            ).not.toThrow();
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`alsjdlasdf@tup.edu.ph`)
            ).not.toThrow();
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`xxxxxxx@tup.edu.ph`)
            ).not.toThrow();
        });

        test(`should throw any error in username`, () => {
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`@tup.edu.ph`)
            ).toThrow(`Username is required`);

            expect(() =>
                TUPEmailValidator.validateTUPEmail(`.@tup.edu.ph`)
            ).toThrow(
                `Invalid first character. ${errorMessage}`
            );
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`d.@tup.edu.ph`)
            ).toThrow(
                `Invalid last character. ${errorMessage}`
            );
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`d..d@tup.edu.ph`)
            ).toThrow(`Consecutive dots are not allowed in username`);
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`$d@tup.edu.ph`)
            ).toThrow(
                `Invalid Username. ${errorMessage}`
            );
        });

        test(`should throw error if email is invalid`, () => {
            expect(() =>
                TUPEmailValidator.validateTUPEmail(`xxxxxxx@xxxxxx`)
            ).toThrow(`Invalid domain`);
        });
    });
});
