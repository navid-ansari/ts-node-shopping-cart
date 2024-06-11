import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { SignUp } from "../../type/Signup"
import { SignIn } from "../../type/Signin";
import { addUser, getUser } from "../../service/user/user.service";
import { TokenValidator } from "../../utils/token-validator";
import { generateRefreshToken, generateToken } from "../../middleware/auth";


export const signupHandler = async (req: Request, res: Response): Promise<void> => {
    const { body }: {body: SignUp} = req
    try {
        const user = await addUser(body)
        res.status(201).json(user)
    } catch (error: unknown) {
        res.status(500).json({message: "Error adding new user"})
    }
}

export const signinHandler = async (req: Request, res: Response): Promise<void> => {
    const { body }: {body: SignIn} = req
    try {
        const user = await getUser(body)
        console.log(user)
        if(user) {
            const token = await generateToken()
            const refreshToken = await generateRefreshToken()
            res.cookie("token", token)
            res.cookie("refreshToken", refreshToken)
        }
        res.status(200).json(user)
    } catch (error: unknown) {
        console.log(error)
        res.status(500).json({message: "Error in user login"})
    }
}