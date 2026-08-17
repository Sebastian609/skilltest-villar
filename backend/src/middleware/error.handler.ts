import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(`[${new Date().toISOString()}] Unhandled error:`, err);
  res.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
}
