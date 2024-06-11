import { Request, Response, NextFunction } from "express";
import { addProduct, getProduct } from "../../service/product/product.service";
import { Product } from "../../type/Product";
import { IParam } from "../../type/RequestParam";

export const addProductHandler = async(req: Request, res: Response): Promise<void> => {
    const { body }: {body: Product} = req
    try {
        const product = await addProduct(body)
        res.status(201).json(product)
    } catch(error: unknown) {
        res.status(500).json({message: "Error adding new product"})
    }
}



export const getProductHandler = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    try {
        const product = await getProduct(id)
        res.status(200).json(product)
    } catch(error: unknown) {
        res.status(500).json({message: "Error getting product"})
    }
}