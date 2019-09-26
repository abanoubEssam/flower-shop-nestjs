import { Document } from "mongoose";

export interface User extends Document {
    readonly id?: string | number;
    readonly name: string;
    readonly age: number;
    readonly email: string;
    readonly password: string;
    readonly userImage: string;
}
