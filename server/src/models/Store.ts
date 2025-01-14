import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  
import Vendor from './Vendor';
import Product from './Product';

// Define User attributes
interface IStoreAttributes {
    store_id: number;
    vendor_id: number;
    store_name: string;
    store_url: string;
    store_description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface IStoreCreationAttributes extends Optional<IStoreAttributes, 'store_id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
class Store extends Model<IStoreAttributes, IStoreCreationAttributes> implements IStoreAttributes {
    public store_id!: number;
    public vendor_id!: number;
    public store_name!: string;
    public store_url!: string;
    public store_description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Store.init(
    {
        store_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,  // Auto-generate IDs
            primaryKey: true,     // Marks as the primary key
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'vendors',
                key: 'vendor_id',
            }
        },
        store_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        store_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        store_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'stores',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

Store.hasMany(Product, {
    foreignKey: 'store_id',
})

export default Store;
