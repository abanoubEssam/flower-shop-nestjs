import * as mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc-fix';
export const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        userImage: {
            original: {
                type: String,
            },
            thumbnail: {
                type: String,
            },
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
UserSchema.plugin(autoIncrement, {
    model: 'User',
    field: '_id',
    startAt: 1,
});
