import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  // Adjust the path based on your project structure
import Product from './Product';
// Define Country attributes
interface ICategoryAttributes {
    category_id: number;
    category_name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a Country
interface ICategoryCreationAttributes extends Optional<ICategoryAttributes, 'category_id' |'createdAt' | 'updatedAt'> {}

// Define the Country model
class Category extends Model<ICategoryAttributes, ICategoryCreationAttributes> implements ICategoryAttributes {
    public category_id!: number;
    public category_name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Category.init(
    {
        category_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'categories',
        timestamps: true, // Enables createdAt and updatedAt
    }
);

Category.hasMany(Product, { 
    foreignKey: 'category_id',
});


export default Category;
