import * as mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc-fix';
export const FlowerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        flowerImage: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            // to delete some of model object
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
            },
        },
    },
);
FlowerSchema.plugin(autoIncrement, {
    model: 'Flower',
    field: '_id',
    startAt: 1,
});
