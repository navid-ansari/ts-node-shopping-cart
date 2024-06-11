import express, { Express } from "express";
import {routes} from "../routes/v1/routes"

export const appInitializer = (): Express => {
    const app = express()
    app.use(express.json())
    routes(app)
    return app
}