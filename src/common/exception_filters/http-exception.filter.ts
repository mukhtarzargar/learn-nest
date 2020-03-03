import { 
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
// export class AllExceptionFilter extends BaseExceptionFilter{
//     catch(exception: unknown, host: ArgumentsHost){
//         super.catch(exception, host)
//     }
// }
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost){
        const status = exception.getStatus()
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            })

        // const ctx = host.switchToHttp();
        // const request = ctx.getRequest();
        // const response = ctx.getResponse();
        
    //     const status = exception instanceof HttpException
    //         ? exception.getStatus()
    //         : HttpStatus.INTERNAL_SERVER_ERROR

    //     response
    //         .status(status)
    //         .json({
    //             statusCode: status,
    //             timestamp: new Date().toISOString(),
    //             path: request.url,
    //         });
    }
}