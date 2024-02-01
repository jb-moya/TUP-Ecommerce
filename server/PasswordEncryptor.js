import bcrypt from "bcryptjs";

export default class PasswordEncryptor {
    constructor() {
        this.saltRounds = 10;
    }

    async encryptPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            return hashedPassword;
        } catch (error) {
            throw new Error("Error encrypting password");
        }
    }

    async comparePasswords(plainPassword, hashedPassword) {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            return match;
        } catch (error) {
            throw new Error("Error comparing passwords");
        }
    }
}