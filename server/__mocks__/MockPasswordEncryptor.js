export default class MockPasswordEncryptor {
    static async hashPassword(password) {
        return password;
    }

    static async comparePasswords(plainPassword, hashedPassword) {
        return plainPassword === hashedPassword;
    }
}
