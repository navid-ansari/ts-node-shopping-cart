import supertest, {Request} from 'supertest';
import { appInitializer } from '../../../app-initializer/app-initializer';
import { clearMockMongoDBCollection, closeMockMongoDB, connectMockMongoDB } from '../test.db.config';

describe("Healthcheck repository: Integration tests", () => {

    const app = appInitializer()

    it("Healthcheck success: 200", async () => {

        const response = await supertest(app).get('/api/v1/healthcheck')
        .set('Accept', 'application/text')

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch("text");
        expect(response.text).toEqual("Healthcheck success")
        
    })
})