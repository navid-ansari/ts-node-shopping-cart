import supertest, { Request } from 'supertest';
import { omit } from "lodash"
import { appInitializer } from '../../../app-initializer/app-initializer';
import { ProductSchema } from '../../../model/ProductSchema';

import { clearMockMongoDBCollection, closeMockMongoDB, connectMockMongoDB } from '../test.db.config';
import { RequestValidationError } from '../../../response-types/RequestValidationError';

describe("Product repository: Integration tests", () => {

    const app = appInitializer()

    beforeEach(async()=> {
        await connectMockMongoDB()
    })
    afterEach(async()=> {
        //await clearMockMongoDBCollection()
        await closeMockMongoDB()
    })

    describe("Add product", () => {
        it("Add product to database: 201", async () => {
        
            const payload = {
                name: "Mobile",
                title: "Touch screen mobile",
                price: 200,
                description: "Touch screen smartphone with 2 GB ram",
                category: "Electronics",
                image: "http://imagepath.com/imageid"
            } as Partial<Request>
    
            const response = await supertest(app)
            .post("/api/v1/add-product")
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
           
            expect(response.status).toEqual(201)
            expect(response.headers["content-type"]).toMatch("json");
            expect(omit(response.body, ["_id", "__v", "createdAt", "updatedAt"])).toEqual({...payload})
            
        })

        it("Add product - request body validation failed: 400", async () => {
        
            const payload = {
                title: "Touch screen mobile",
                price: 200,
                description: "Touch screen smartphone with 2 GB ram",
                category: "Electronics",
                image: "http://imagepath.com/imageid"
            } as Partial<Request>

            const errorResponse: RequestValidationError[] = [
                new RequestValidationError("name", "Product name is required")
            ]
    
            const response = await supertest(app)
            .post("/api/v1/add-product")
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
    
            expect(response.status).toEqual(400)
            expect(response.headers["content-type"]).toMatch("json")
            expect(response.body.length).toEqual(errorResponse.length);
            expect(response.body).toEqual(expect.arrayContaining(errorResponse));
        })
    })    
})