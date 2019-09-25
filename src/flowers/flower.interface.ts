import { Document } from "mongoose";

export interface Flower extends Document {
    readonly id?: string | number;
    readonly title: string;
    readonly description: string;
    readonly price: string;
}
