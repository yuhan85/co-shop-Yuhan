import { DataTypes, Model } from 'sequelize';
import db from '../lib/dbConnection';
import Order from './Order';
import Product from './Product';

class OrderItems extends Model {
    public order_id!: number;
    public product_id!: number;
    public qty!: number;
    public unit_price!: number;
}

OrderItems.init(
    {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'order_id',
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
        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'order_items',
        timestamps: false,  // Custom timestamp fields used instead
    }
);

OrderItems.belongsTo(Order, { foreignKey: 'order_id' });
OrderItems.belongsTo(Product, { foreignKey: 'product_id' });

export default OrderItems;
