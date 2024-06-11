import mongoose from 'mongoose';
const { Schema } = mongoose;
import { Product } from "../type/Product";

const schema = new Schema<Product>(
    { 
        name: {type: String, required: true},
        title: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true},
        category: {type: String, required: true},
        image: {type: String, required: true}
    },
    {
        timestamps: true,
        collection: 'ALL_PRODUCTS'
    });
    
export const ProductSchema = mongoose.model<Product>('AddProductModel', schema);

/*mongoose.plugin((schema: any) => {
    schema.options.toJSON = {
      virtuals: true,
      versionKey: false,
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      }
    };
  });*/

/*schema.virtual('id').get(function () {
  return this._id;
});

schema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v
    }
});*/