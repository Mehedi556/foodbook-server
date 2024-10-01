import { Response } from "express";

type TNoDataFoundResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T;
  };


const noDataFoundResponse = <T>(res: Response, data: TNoDataFoundResponse<T>) => {
    res.status(data?.statusCode).json({
      success: data.success,
      statusCode: data?.statusCode,
      message: data.message,
      data: data.data,
    });
  };

  export default noDataFoundResponse;