import type { Route } from './core/interfaces/index.js';
import { LogScope, logger, loggingMiddleware } from './core/logger/index.js';
import express from 'express';
import mongoose from 'mongoose';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

class App {
  public app: express.Application;
  public port: number | string;
  public production: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.production = process.env.NODE_ENV === 'production' ? true : false;
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.connectToDatabase();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`${LogScope.APP} App listening on the port ${this.port}`);
    });
  }
  private initializeRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(loggingMiddleware);

    if (this.production) {
      this.app.use(hpp());
      this.app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
      this.app.use(helmet());
      this.app.use(compression());
    } else {
      this.app.use(cors({ origin: true, credentials: true }));
    }
  }
  private async connectToDatabase(): Promise<void> {
    try {
      const connectionString = process.env.MONGODB_URI;
      if (!connectionString) {
        logger.warn(`${LogScope.DATABASE} Connection string is invalid`);
        return;
      }
      await mongoose.connect(connectionString);
      logger.info(`${LogScope.DATABASE} Connected to the database successfully`);
    } catch (error) {
      logger.error(error, `${LogScope.DATABASE} Database connection failed`);
    }
  }
}

export default App;
