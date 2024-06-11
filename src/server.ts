import { Express, Request, Response } from "express";
import { appInitializer } from "./app-initializer/app-initializer";
import { connectMongoDB } from "./datasource/db.config";

export const app: Express = appInitializer()
const port: string | number = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) : void => {
  res.send("Express + TypeScript Serve");
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectMongoDB()
});