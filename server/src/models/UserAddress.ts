import { DataTypes, Model } from 'sequelize';
import db from '../lib/dbConnection';
import User from './User';
import Address from './Address';

class UserAddress extends Model {
    public user_id!: number;
    public address_id!: number;
}

UserAddress.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'addresses',
                key: 'address_id',
            },
        },
    },
    {
        sequelize: db,
        tableName: 'user_addresses',
        timestamps: false,  // Custom timestamp fields used instead
    }
);

User.belongsToMany(Address, {
    through: 'UserAddress',  // Junction table
    foreignKey: 'user_id',
});

Address.belongsToMany(User, { 
    through: 'UserAddress',
    foreignKey: 'address_id',
});


export default UserAddress;
