import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ImATeapotException, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { tap, map, catchError, timeout } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        console.log('Before...');

        const now = Date.now();
        return next.handle().pipe(
            timeout(500),
            map(value =>  {

                Object.entries(value).forEach(entry =>{
                    value[entry[0]] = value[entry[0]] === false? true: value[entry[0]]
                })
                return value
            }),
            catchError(err => {
                if (err instanceof TimeoutError)
                    return throwError(new RequestTimeoutException())
                return throwError (new ImATeapotException())
            }),
        );
    };
}