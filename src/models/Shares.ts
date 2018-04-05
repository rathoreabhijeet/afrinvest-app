import {
    Schema,
    model,
    PaginateModel,
    PaginateOptions,
    PaginateResult,
    Document
} from 'mongoose';
import * as mongoosePaginate from "mongoose-paginate";
export interface SharesInterface extends Document {
    company_name: string;
    company_abbreviation: string;
    price: number;
    change_value: {
        sign: string,
        value: number
    };
    change_percentage: {
        sign: string,
        value: number
    };
    market_capacity: {
        price: number,
        currency: string
    }
    status: string,
    user_id: string
};

const SharesSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is Require']
    },
    company_name: {
        type: String,
        required: [true, 'Company name is Require']
    },
    company_abbreviation: {
        type: String,
        required: [true, 'Company abbreviation is Require']
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive'],
    },
    price: {
        type: Number,
        default: 0,
    },
    change_value: {
        value: {
            type: Number,
            default: 0,
        },
        sign: {
            type: String,
            default: 'plus',
            enum: ['plus', 'minus'],
        }
    },
    change_percentage: {
        value: {
            type: Number,
            default: 0,
        },
        sign: {
            type: String,
            default: 'plus',
            enum: ['plus', 'minus'],
        }
    },
    market_capacity: {
        price: {
            type: Number,
            default: 0,
        },
        currency: {
            type: String,
            default: 'bit-coin',
        }
    }
}, { timestamps: true });
SharesSchema.plugin(mongoosePaginate);
interface SharesModel<T extends Document> extends PaginateModel<T> { };
export const Shares: SharesModel<SharesInterface> = model<SharesInterface>('Shares', SharesSchema) as SharesModel<SharesInterface>;