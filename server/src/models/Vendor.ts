import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  
import Store from './Store';

// Define User attributes
interface IVendorAttributes {
    vendor_id: number;
    user_id: number;
    stripe_account_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface IVendorCreationAttributes extends Optional<IVendorAttributes, 'vendor_id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
class Vendor extends Model<IVendorAttributes, IVendorCreationAttributes> implements IVendorAttributes {
    public vendor_id!: number;
    public user_id!: number;
    public stripe_account_id!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Vendor.init(
    {
        vendor_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,  // Auto-generate IDs
            primaryKey: true,     // Marks as the primary key
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            }
        },
        stripe_account_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'vendors',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

Vendor.hasMany(Store, {
    foreignKey: 'vendor_id',
});

export default Vendor;
