const express = require("express");
const { z, object } = require("zod");

export const addProductSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Product name is required"
        }),
        title: z.string({
            required_error: "Product title is required"
        }),
        price: z.number({
            required_error: "Product price is required"
        }),
        description: z.string({
            required_error: "Product description is required"
        }),
        category: z.string({
            required_error: "Product category is required"
        }),
        image: z.string({
            required_error: "Image path is required"
        })
    })
})