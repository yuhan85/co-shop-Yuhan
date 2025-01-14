import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  
import Product from './Product';
import Customer from './Customer';

// Define User attributes
interface IReviewAttributes {
    review_id: number;
    customer_id: number;
    ordered_product_id: number;
    rating_score: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface IReviewCreationAttributes extends Optional<IReviewAttributes, 'review_id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
class Review extends Model<IReviewAttributes, IReviewCreationAttributes> implements IReviewAttributes {
    public review_id!: number;
    public customer_id!: number;
    public ordered_product_id!: number;
    public rating_score!: number;
    public comment!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Review.init(
    {
        review_id: {
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
        ordered_product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'product_id',
            }
        },
        rating_score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'reviews',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

Review.belongsTo(Product, {
    foreignKey: 'ordered_product_id',
});

Review.belongsTo(Customer, {
    foreignKey: 'customer_id',
})

export default Review;
