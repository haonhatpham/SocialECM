import Route from '@/core/interfaces/routes.interface.js';
import IndexController from '@/module/index/index.controller.js';
import { Router } from 'express';

export default class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.indexController.index);
  }
}
