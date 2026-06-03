import { Route } from './core/interfaces/index.js';
import express from 'express';

class App {
  public app: express.Application;
  public port: number | string;
  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.initializeRoutes(routes);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
  private initializeRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }
}

export default App;
