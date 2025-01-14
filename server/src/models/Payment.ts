import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  
import Order from './Order';

// Define User attributes
interface IPaymentAttributes {
    payment_id: number;
    order_id: number;
    stripe_charge_id: string;
    payment_status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface IPaymentCreationAttributes extends Optional<IPaymentAttributes, 'payment_id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
class Payment extends Model<IPaymentAttributes, IPaymentCreationAttributes> implements IPaymentAttributes {
    public payment_id!: number;
    public order_id!: number;
    public stripe_charge_id!: string;
    public payment_status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Payment.init(
    {
        payment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,  // Auto-generate IDs
            primaryKey: true,     // Marks as the primary key
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'orders',
                key: 'order_id',
            }
        },
        stripe_charge_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'payments',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

export default Payment;
