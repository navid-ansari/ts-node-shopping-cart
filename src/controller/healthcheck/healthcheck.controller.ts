import { Request, Response } from "express";
import { onHealthcheck } from "../../service/healthcheck/healthcheck.service";

export const healthcheckHandler = async(req: Request, res: Response): Promise<void> => {
    const healthcheck = await onHealthcheck()
    res.status(200).send(healthcheck);
}