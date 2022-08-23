import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ResponseService {
  successResponse(status = false, result, @Res() res: Response) {
    if (status !== false) {
      res.status(HttpStatus.OK).json({
        status: true,
        statusCode: 200,
        message: 'success',
        payload: result,
      });
    } else {
      res.status(HttpStatus.OK).json({
        status: false,
        statusCode: 200,
        message: 'No Data Found!',
        payload: null,
      });
    }
  }

  badRequestResponse(result, @Res() res: Response) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: false,
      statusCode: 400,
      message: result,
      payload: 'Bad Request',
    });
  }

  serverFailureResponse(result = [], @Res() res: Response) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: true,
      statusCode: 500,
      message: result,
      payload: 'Internal Server Error!',
    });
  }

}
