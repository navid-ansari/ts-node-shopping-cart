import { ProductSchema } from "../../model/ProductSchema"
import { add, get } from "./product.repository"
import { Product } from "../../type/Product"
import { ProductFixture } from "../../fixture/ProductFixture"
import mongoose, {Document, ObjectId, Types} from "mongoose"

jest.mock("../../model/ProductSchema")

//const mocked = jest.mocked

describe("Product repository", () => {

    interface ProductDocument extends Product, Document {
        _id: Types.ObjectId
    }

    const product: Product = {
        name: "Mobile",
        title: "Touch screen mobile",
        price: 200,
        description: "Touch screen smartphone with 2 GB ram",
        category: "Electronics",
        image: "http://imagepath.com/imageid"
    }
    
    const productDocument: Partial<ProductDocument> = {
        ...product,
        _id: new mongoose.Types.ObjectId()
    }
    //const productFixture: Document = ProductFixture()
    
    describe("Add product", () => {
        it("Add product success: 200", async() => {
            
            const schema = new ProductSchema({...product})
            jest.spyOn((schema), "save").mockResolvedValue(productDocument as ProductDocument)
            const saveProduct = await add(product)
            expect(saveProduct).toEqual(productDocument)
        })

        it("Add product error: 500", async() => {
            const schema = new ProductSchema({...product})
            jest.spyOn((schema), "save").mockRejectedValue(new Error("Error: Add product"))

            await expect(add(product)).rejects.toThrowError();
            await expect(add(product)).rejects.toThrow("Error: Add product")

        })

        it("Add product error, option 2: 500", async() => {
            const schema = new ProductSchema({...product})
            jest.spyOn((schema), "save").mockRejectedValue(new Error("Error: Add product"))
            try {
                const saveProduct = await add(product)
            } catch (error: any) {
                expect(error.message).toBe("Error: Add product");
            }
        })
    })
    

    describe("Get product", () => {
        const id = String(productDocument._id)
        it("Get product success: 200", async() => {
            jest.spyOn((ProductSchema), "findById").mockResolvedValue(productDocument as ProductDocument)
            const getProduct = await get(id)

            expect(getProduct).toEqual(productDocument)
        })

        it("Get product error: 500", async() => {
            const schema = new ProductSchema({...product})
            jest.spyOn((ProductSchema), "findById").mockRejectedValue(new Error("Error: Get product"))
            
            await expect(get(id)).rejects.toThrowError();
            await expect(get(id)).rejects.toThrow("Error: Get product")
        })
    })
    
})
