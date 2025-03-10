// import express, { Request, Response, NextFunction } from 'express';
// import countryRoutes from './routes/countryRoutes';
// import couponRoutes from './routes/couponRoutes';
// import orderRoutes from './routes/orderRoutes';
// import productRoutes from './routes/productRoutes';
// import reviewRoutes from './routes/reviewRoutes';
// import storeRoutes from './routes/storeRoutes';
// import cartRoutes from './routes/cartRoutes';
// import cartitemRoutes from './routes/cartitemRoutes';
// import orderitemRoutes from './routes/orderitemRoutes';
// import paymentRoutes from './routes/paymentRoutes';
// import userRoutes from './routes/userRoutes';
// import AuthController from './controllers/auth.controller';
// import ProtectedController from './controllers/protected.controller';
// import HomeController from './controllers/home.controller';
// import AuthMiddleware from './middleware/auth.middleware';

// import { errorHandler } from './middleware/errorMiddleware';

// const app = express();

// app.use(express.json()); // Middleware to parse JSON

// app.use('/api/countries', countryRoutes); // Use country routes
// app.use('/api/coupons', couponRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/stores', storeRoutes);
// app.use('/api/carts', cartRoutes);
// app.use('/api/cartitems', cartitemRoutes);
// app.use('/api/orderitems', orderitemRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/countries', countryRoutes); // Use country routes
// app.use('/api/users', userRoutes); // Use country routes

// const authMiddleware = new AuthMiddleware();
// const authController = new AuthController();
// const protectedController = new ProtectedController();
// const homeController = new HomeController();

// app.use(authMiddleware.verifyToken.bind(authMiddleware)); // Use AuthMiddleware for token verification
// app.use(authController.path, authController.router);
// app.use(protectedController.path, protectedController.router);
// app.use(homeController.path, homeController.router);

// // Explicitly cast errorHandler to an ErrorRequestHandler function
// app.use(errorHandler as express.ErrorRequestHandler);

// export default app;

import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import db from './lib/dbConnection';

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middlewares: any; routers: any }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middlewares);
    this.routes(appInit.routers);
    this.app.use(cors());
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App has started on port ${this.port}`);
    });
  }

  public async startServer() {
    // Sync the database
    await db.sync({ alter: true });
    this.listen();
  };

  private routes(routers: any) {
    routers.forEach(
      (routers: { path: string; router: express.Router }) => {
        this.app.use(routers.path, routers.router);
      }
    );
  }

  private middlewares(middlewares: any) {
    middlewares.forEach((middleware: express.RequestHandler) => {
      this.app.use(middleware);
    });
  }
}

export default App;
