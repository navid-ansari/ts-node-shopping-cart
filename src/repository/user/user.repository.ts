import { SignUp } from "../../type/Signup"
import { SignIn } from "../../type/Signin";
import { UserSchema } from "../../model/UserSchema";

export const add = async(body: SignUp): Promise<SignUp> => {
    const schema = new UserSchema({...body})
    try {
        const user: SignUp = await schema.save()
        return user
    } catch(error: unknown) {
        throw new Error("Error: Add user")
    }
}

export const get = async(body: SignIn): Promise<SignUp | null> => {
    const { email, password } = body
    try {
        if(body.email) {
            const user: SignUp | null = await UserSchema.findOne({email, password})
            return user
        } else {
            const user: SignUp | null = await UserSchema.findOne({email, password})
            return user
        }
    } catch(error: unknown) {
        throw new Error("Error: Get user")
    }
}

export const getByEmail = async (body: SignIn) => {
    const { email } = body
    try {
        const user: SignUp | null = await UserSchema.findOne({ email })
        return user
    } catch(error: unknown) {
        throw new Error("Error: Get user by email")
    }
}

export const getByMobileNo = async (body: SignIn) => {
    const { mobileNo } = body
    try {
        const user: SignUp | null = await UserSchema.findOne({ mobileNo })
        return user
    } catch(error: unknown) {
        throw new Error("Error: Get user by mobile no")
    }
}