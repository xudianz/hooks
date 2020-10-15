import { Request, Response, NextFunction } from 'express'
import HttpException from '../exception/httpException'
import { StatusCodes } from 'http-status-codes'

const errorMiddleware = (error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  let result: any = {
    success: false,
    message: error.message
  }
  if (error.errors && Object.keys(error.errors).length > 0) {
    result.errors = error.errors
  }
  // INTERNAL_SERVER_ERROR = 500
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json(result)
}

export default errorMiddleware