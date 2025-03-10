// User.ts - Model Layer with Sequelize

import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  
import Address from './Address';
import Vendor from './Vendor';
import Customer from './Customer';
import Order from './Order';

// Define User attributes
interface IUserAttributes {
    user_id: number;
    name: string;
    family_name: string;
    email: string;
    avatar: string;
    // isValid?: boolean;
    // role: 'customer' | 'admin' | 'vendor';
    // phone_number: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface IUserCreationAttributes extends Optional<IUserAttributes, 'createdAt' | 'updatedAt'> {}

// Define the User model
class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    public user_id!: number;
    public name!: string;
    public family_name!: string;
    public email!: string;
    public avatar!: string;
    // public isValid!: boolean;
    // public role!: 'customer' | 'admin' | 'vendor';
    // public phone_number!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,     // Marks as the primary key
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        family_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // isValid: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: true,  // Default value is TRUE
        // },
        // role: {
        //     type: DataTypes.ENUM('customer', 'admin', 'vendor'),
        //     defaultValue: 'customer',  // Default role is 'customer'
        // },
        // phone_number: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         isMobilePhone: true,
        //     }
        // },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'users',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

User.hasOne(Vendor, {
    foreignKey: 'user_id',
});

User.hasOne(Customer, {
    foreignKey: 'user_id',
})

User.hasMany(Order, {
    foreignKey: 'customer_id',
});

export default User;
