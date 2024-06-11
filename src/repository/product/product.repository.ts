import { Product } from "../../type/Product";
import { ProductSchema } from "../../model/ProductSchema";

export const add = async(body: Product): Promise<Product> => {
    const schema = new ProductSchema({...body})
    try {
        const product: Product = await schema.save()
        return product
    } catch(error: unknown) {
        throw new Error("Error: Add product")
    }
}

export const get = async(id: string): Promise<Product | null> => {
    try {
        const product: Product | null = await ProductSchema.findById(id)
        return product
    } catch(error: unknown) {
        throw new Error("Error: Get product")
    }
}