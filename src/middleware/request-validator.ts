import {Request, Response, NextFunction} from "express"
import { AnyZodObject, z } from "zod"
import { RequestValidationError } from "../response-types/RequestValidationError"

export const requestValidator =  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const {body, query, params} = req
    try {
         schema.parse({
            body,
            query,
            params
        })
        next()
    } catch(e: unknown) {
        if(e instanceof z.ZodError) {
            const { errors } = e
            const errorResponse: RequestValidationError[] = errors.map((error: any): RequestValidationError => {
                const [body, name] = error.path
                return new RequestValidationError(name, error.message)
            } )
            return res.status(400).send(errorResponse)
        }
    }
}