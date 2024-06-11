import mongoose, { Schema } from 'mongoose';
import { SignUp } from "../type/Signup";

const schema = new Schema<SignUp>(
    { 
        mobileNo: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true}
    },
    {
        timestamps: true,
        collection: 'ALL_USERS'
    });
    
export const UserSchema = mongoose.model<SignUp>('AddUserModel', schema);