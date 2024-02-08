import bcrypt from "bcryptjs";

export default class PasswordEncryptor {
    static saltRounds = 10;

    static async encryptPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, PasswordEncryptor.saltRounds);
            return hashedPassword;
        } catch (error) {
            throw new Error("Error encrypting password");
        }
    }

    static async comparePasswords(plainPassword, hashedPassword) {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            return match;
        } catch (error) {
            throw new Error("Error comparing passwords");
        }
    }
}