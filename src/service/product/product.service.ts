import { add, get } from "../../repository/product/product.repository";
import { Product } from "../../type/Product";

export const addProduct = async(body: Product): Promise<Product> => {
    try {
        const product = await add(body)
        return product
    } catch(error: any) {
        throw new Error(error)
    }
}

export const getProduct = async(id: string): Promise<Product | null> => {
    try {
        const product = await get(id)
        return product
    } catch(error: any) {
        throw new Error(error)
    }
}