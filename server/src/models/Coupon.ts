import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  
import Product from './Product';

// Define User attributes
interface ICouponAttributes {
    coupon_id: number;
    product_id: number;
    amount: number;
    type: string;
    start_date: Date;
    end_date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface ICouPonCreationAttributes extends Optional<ICouponAttributes, 'coupon_id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
class Coupon extends Model<ICouponAttributes, ICouPonCreationAttributes> implements ICouponAttributes {
    public coupon_id!: number;
    public product_id!: number;
    public amount!: number;
    public type!: string;
    public start_date!: Date;
    public end_date!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Coupon.init(
    {
        coupon_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,  // Auto-generate IDs
            primaryKey: true,     // Marks as the primary key
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'product_id',
            }
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'coupons',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

export default Coupon;
