import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class SerializeInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        //here we handle request


        //here we handle response
        return next.handle().pipe(
            map((data:any)=>{
                return{
                success:true,
                data
            }})
        )
    }
}