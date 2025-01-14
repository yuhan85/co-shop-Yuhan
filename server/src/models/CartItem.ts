import { DataTypes, Model } from 'sequelize';
import db from '../lib/dbConnection';
import Cart from './Cart';
import Product from './Product';

class CartItem extends Model {
    public cart_id!: number;
    public product_id!: number;
    public qty!: number;
}

CartItem.init(
    {
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'carts',
                key: 'cart_id',
            },
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'product_id',
            },
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'cart_items',
        timestamps: false,  // Custom timestamp fields used instead
    }
);

Cart.belongsToMany(Product, {
    through: 'CartItem',  // Junction table
    foreignKey: 'cart_id',
});

Product.belongsToMany(Cart, {
    through: 'CartItem',  // Junction table
    foreignKey: 'product_id',
});


export default CartItem;
