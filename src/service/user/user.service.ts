import { SignUp } from "../../type/Signup"
import { SignIn } from "../../type/Signin";
import { add, get, getByEmail, getByMobileNo } from "../../repository/user/user.repository";
import { ErrorHandler } from "../../response-types/error-response/error-handler";
import { PasswordValidator } from "../../utils/password-validator"

export const addUser = async (body: SignUp): Promise<SignUp> => {
    const { password } = body
    const passwordValidator = new PasswordValidator(password)
    const hashedPassword =  await passwordValidator.encryptPassword()
    try {
        const user = await add({...body, password: hashedPassword})
        return user
    } catch(error: any) {
        throw new Error(error)
    }
}

export const getUser = async (body: SignIn): Promise<SignUp | null | ErrorHandler> => {
    const { username, password } = body
    try {
        let user: SignUp | null;
        if(typeof username === "string") {
            user = await getByEmail({...body, email: username})
        } else {
            user = await getByMobileNo({...body, mobileNo: username})
        }
        if(!user) { // user not found - 404
            return new ErrorHandler(404, "User not found")
        }
        const passwordValidator = new PasswordValidator(password)
        const passwordHash = user.password
        const isPasswordMatched = await passwordValidator.decryptPassword(passwordHash)
        if(user && isPasswordMatched) {
            return user
        } else { // password do not match - 401
            return new ErrorHandler(401, "Incorrect password")
        }
    } catch(error: any) {
        throw new Error(error)
    }
}

export const setAuth = async (body: SignIn): Promise<void> => {

}