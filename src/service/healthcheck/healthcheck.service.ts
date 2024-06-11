import { Request, Response } from "express";
import { check } from "../../repository/healthcheck/healthcheck.repository";


export const onHealthcheck = async(): Promise<string> => {
    const message: string = await check()
    return message
}