import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IEnvironmentModel } from '@core/interfaces/environment.model';

@Injectable({
  providedIn: 'root',
})
export class httpsRequestInterceptor implements HttpInterceptor {
  constructor(@Inject('environment') private environment: IEnvironmentModel) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url) {
      const modifiedReq = req.clone({
        url: `${this.environment.apiUrl}${req.url}`,
      });
      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
