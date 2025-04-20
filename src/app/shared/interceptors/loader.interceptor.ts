import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private renderer: Renderer2;

  constructor(
    private spinner: NgxSpinnerService,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.showLoader();
    return next.handle(req).pipe(
      tap(
        async (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.onEnd();
          }
        },
        (err: any) => {
          this.onEnd();
        },
      ),
    );
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.spinner.show();
  }

  private hideLoader(): void {
    this.spinner.hide();
  }
}
