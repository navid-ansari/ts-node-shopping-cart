import bcrypt from "bcrypt";

export class PasswordValidator {

    private password: string;

    constructor(password: string) {
        this.password = password
    }

    public async encryptPassword (): Promise<string> {
        return bcrypt.hash(this.password, 10)
    }

    public async decryptPassword (hash: string): Promise<boolean> {
        return bcrypt.compare(this.password, hash)
    }
}