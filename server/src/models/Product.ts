import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  
import Store from './Store';
import Categary from './Category';
import Cart from './Cart';
import Coupon from './Coupon';

// Define User attributes
interface IProductAttributes {
    product_id: number;
    store_id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    stock_quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface IProductCreationAttributes extends Optional<IProductAttributes, 'product_id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
class Product extends Model<IProductAttributes, IProductCreationAttributes> implements IProductAttributes {
    public product_id!: number;
    public store_id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public category_id!: number;
    public stock_quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Product.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,  // Auto-generate IDs
            primaryKey: true,     // Marks as the primary key
        },
        store_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'stores',
                key: 'store_id',
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),  // Best practice for prices
            allowNull: false,
            validate: {
                isDecimal: true,  // Ensure price is a decimal
                min: 0,           // Ensure price is non-negative
            },
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'category_id',
            }
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'products',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

Product.hasMany(Coupon, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
});

export default Product;
