import { Request, Response, NextFunction } from 'express';

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await fn(req, res, next); // Wait for the async function to resolve
      } catch (err) {
        next(err); // Pass the error to Express error-handling middleware
      }
    };
  };
  
export default asyncHandler;