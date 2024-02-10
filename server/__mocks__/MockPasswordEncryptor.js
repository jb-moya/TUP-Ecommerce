export default class MockPasswordEncryptor {
    static async encryptPassword(password) {
        return password;
    }

    static async comparePasswords(plainPassword, hashedPassword) {
        return plainPassword === hashedPassword;
    }
}
