import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');
        const httoContext = context.switchToHttp() ;

        const req = httoContext.getRequest() ;

        req.body.userImage = "sfdffsfddf";
        console.log(req.body);

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log(`After... ${Date.now() - now}ms`)),
            );
    }
}
