import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  
import Customer from './Customer';
import Product from './Product';

// Define User attributes
interface ICartAttributes {
    cart_id: number;
    customer_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface ICartCreationAttributes extends Optional<ICartAttributes, 'cart_id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
class Cart extends Model<ICartAttributes, ICartCreationAttributes> implements ICartAttributes {
    public cart_id!: number;
    public customer_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Cart.init(
    {
        cart_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,  // Auto-generate IDs
            primaryKey: true,     // Marks as the primary key
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'customer_id',
            }
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'carts',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

export default Cart;
