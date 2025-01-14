import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  // Adjust the path based on your project structure
import Address from './Address';
// Define Country attributes
interface ICountryAttributes {
    country_id: number;
    country_name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a Country
interface ICountryCreationAttributes extends Optional<ICountryAttributes, 'country_id' | 'createdAt' | 'updatedAt'> {}

// Define the Country model
class Country extends Model<ICountryAttributes, ICountryCreationAttributes> implements ICountryAttributes {
    public country_id!: number;
    public country_name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Country.init(
    {
        country_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'countries',
        timestamps: true, // Enables createdAt and updatedAt
    }
);

Country.hasMany(Address, { 
    foreignKey: 'country_id',
});


export default Country;
