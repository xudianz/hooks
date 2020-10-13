import { Request, Response, NextFunction } from 'express'
import HttpException from '../exception/httpException'
import { StatusCodes } from 'http-status-codes'

const errorMiddleware = (error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  // INTERNAL_SERVER_ERROR = 500
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message,
    errors: error.errors
  })
}

export default errorMiddleware