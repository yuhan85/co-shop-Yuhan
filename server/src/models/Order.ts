import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  
import User from './User';
import Address from './Address';
import Customer from './Customer';
import Payment from './Payment';

// Define User attributes
interface IOrderAttributes {
    order_id: number;
    customer_id: number;
    shipping_address_id: number;
    stripe_payment_id: number;
    order_status: string;
    total_price: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface IOrderCreationAttributes extends Optional<IOrderAttributes, 'order_id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
class Order extends Model<IOrderAttributes, IOrderCreationAttributes> implements IOrderAttributes {
    public order_id!: number;
    public customer_id!: number;
    public shipping_address_id!: number;
    public stripe_payment_id!: number;
    public order_status!: string;
    public total_price!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Order.init(
    {
        order_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'customer_id',
            },
        },
        shipping_address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'addresses',
                key: 'address_id',
            },
        },
        stripe_payment_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        order_status: {
            type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending',
        },
        total_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'orders',
        timestamps: true,
    }
);

Order.hasOne(Payment, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export default Order;
