import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  
import User from './User';
import Cart from './Cart';
import Order from './Order';

// Define User attributes
interface ICustomerAttributes {
    customer_id: number;
    user_id: number;
    stripe_customer_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface ICustomerCreationAttributes extends Optional<ICustomerAttributes, 'customer_id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
class Customer extends Model<ICustomerAttributes, ICustomerCreationAttributes> implements ICustomerAttributes {
    public customer_id!: number;
    public user_id!: number;
    public stripe_customer_id!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Customer.init(
    {
        customer_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,  // Auto-generate IDs
            primaryKey: true,     // Marks as the primary key
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'users',
                key: 'user_id',
            }
        },
        stripe_customer_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'customers',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

Customer.hasMany(Cart, {
    foreignKey: 'customer_id',
})

Customer.hasMany(Order, {
    foreignKey: 'customer_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export default Customer;
