import { Request, Response, NextFunction } from 'express';

export default class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.status(200).json({
        success: true,
        message: 'Welcome to the Social Media API'
      });
    } catch (error) {
      next(error);
    }
  };
}
