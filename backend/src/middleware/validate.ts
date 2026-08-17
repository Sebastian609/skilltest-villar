import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
        res.status(400).json({
          status: 400,
          message: 'Invalid query parameters',
          errors: messages,
        });
        return;
      }
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  };
}

export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
        res.status(400).json({
          status: 400,
          message: 'Invalid path parameters',
          errors: messages,
        });
        return;
      }
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  };
}
