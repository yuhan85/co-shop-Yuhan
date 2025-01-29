import { faker } from '@faker-js/faker';
import sequelize from '../lib/dbConnection';
import User from '../models/User';
import Customer from '../models/Customer';
import Vendor from '../models/Vendor';
import Product from '../models/Product';
import Store from '../models/Store';
import Category from '../models/Category';
import Address from '../models/Address';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Payment from '../models/Payment';
import Coupon from '../models/Coupon';
import Review from '../models/Review';
import Country from '../models/Country';
import UserAddress from '../models/UserAddress';

(async () => {
  try {
    // Sync the database (use force: true to reset during testing)
    await sequelize.sync({ alter: true });

    // Seed Countries why country have bulkCreate built in method?
    const countries = await Country.bulkCreate([
      { country_name: 'USA' },
      { country_name: 'Canada' },
    ]);

    // Seed Categories
    const categories = await Category.bulkCreate([
      { category_name: 'Electronics' },
      { category_name: 'Clothing' },
      { category_name: 'Books' },
    ]);

    // Seed Users (Customer and Vendor)
    const users = await User.bulkCreate([
      {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone_number: faker.phone.number(),
        role: 'customer',
        isValid: true
      },
      {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone_number: faker.phone.number(),
        role: 'vendor',
        isValid: false
      },
    ]);

    // Seed Vendors and Customers (Associating them with Users)
    const vendor = await Vendor.create({
      user_id: users[1].user_id,
      stripe_account_id: faker.finance.creditCardNumber(),
    });

    const customer = await Customer.create({
      user_id: users[0].user_id,
      stripe_customer_id: faker.finance.creditCardNumber(),
    });

    // Seed Stores (for the Vendor)
    const store = await Store.create({
      vendor_id: vendor.vendor_id,
      store_name: 'Vendor Store',
      store_url: faker.internet.url(),
      store_description: faker.commerce.productDescription(),
    });

    // Seed Products
    const products = await Product.bulkCreate([
      {
        store_id: store.store_id,
        name: 'Laptop',
        description: 'High performance laptop',
        price: 1000,
        category_id: categories[0].category_id,
        stock_quantity: 50,
      },
      {
        store_id: store.store_id,
        name: 'T-shirt',
        description: 'Comfortable cotton T-shirt',
        price: 25,
        category_id: categories[1].category_id,
        stock_quantity: 100,
      },
    ]);

    // Seed Addresses
    const address = await Address.create({
      unit_number: '101',
      street_number: '123',
      address_line_1: 'Main St',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country_id: countries[0].country_id,
    });

    // Seed UserAddress Junction Table
    await UserAddress.bulkCreate([
      { user_id: users[0].user_id, address_id: address.address_id },
      { user_id: users[1].user_id, address_id: address.address_id },
    ]);

    // Seed Cart and CartItems (for Customer)
    const cart = await Cart.create({
      customer_id: customer.customer_id,
    });

    await CartItem.bulkCreate([
      { cart_id: cart.cart_id, product_id: products[0].product_id, qty: 1 },
      { cart_id: cart.cart_id, product_id: products[1].product_id, qty: 2 },
    ]);

    // Seed Orders
    const order = await Order.create({
      customer_id: customer.customer_id,
      shipping_address_id: address.address_id,
      stripe_payment_id: 1234,
      order_status: 'pending',
      total_price: 1050.00,
    });

    // Seed OrderItems
    await OrderItem.bulkCreate([
      { order_id: order.order_id, product_id: products[0].product_id, qty: 1, unit_price: 1000 },
      { order_id: order.order_id, product_id: products[1].product_id, qty: 2, unit_price: 25 },
    ]);

    // Seed Payment
    const payment = await Payment.create({
      order_id: order.order_id,
      stripe_charge_id: 'charge_id_example',
      payment_status: 'paid',
    });

    // Seed Reviews
    await Review.create({
      customer_id: customer.customer_id,
      ordered_product_id: products[0].product_id,
      rating_score: 5,
      comment: 'Great product!',
    });

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await sequelize.close();
  }
})();
