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

// Optional attributes for creating a Country createAt and updatedAt optional globally
interface ICountryCreationAttributes extends Optional<ICountryAttributes, 'country_id' | 'createdAt' | 'updatedAt'> {}

// Define the Country model
class Country extends Model<ICountryAttributes, ICountryCreationAttributes> implements ICountryAttributes {
    public country_id!: number;
    public country_name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
//Preventing invalid data before it reaches database by triggering built-in Sequelize validation errors
Country.init(
    {
        country_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                isInt: true,
            }//add validation
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }//add validation
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'countries',
        timestamps: true, // Enables createdAt and updatedAt
        paranoid: true // Enables soft delete
        //Best for maintaining data history, compliance, and potential record recovery.
    }
);

Country.hasMany(Address, { 
    foreignKey: 'country_id',
});


export default Country;

