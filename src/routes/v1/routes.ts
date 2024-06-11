import { Express } from "express";
import { healthcheckHandler } from "../../controller/healthcheck/healthcheck.controller";
import { signupHandler, signinHandler } from "../../controller/user/user.controller";
import { addProductHandler, getProductHandler } from "../../controller/product/product.controller";
import { requestValidator } from "../../middleware/request-validator"
import { addProductSchema } from "../../request-schema/add-product.schema"
import { authenticateToken } from "../../middleware/auth";

export const routes = (app: Express): void => {
    app.get('/api/v1/healthcheck', healthcheckHandler)
    app.post('/api/v1/sign-up', signupHandler)
    app.post('/api/v1/sign-in', signinHandler)
    app.post('/api/v1/add-product', requestValidator(addProductSchema), addProductHandler)
    app.get('/api/v1/get-product/:id', authenticateToken, getProductHandler)
}