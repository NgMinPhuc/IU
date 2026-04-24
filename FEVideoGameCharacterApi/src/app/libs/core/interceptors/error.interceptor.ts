import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { SeverityConstant, TitleToastConstant } from '../data-access/core.constant';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let detail = error.error?.message || 'An error occurred.';

      switch (error.status) {
        case 400:
          messageService.add({ severity: SeverityConstant.Warn, summary: TitleToastConstant.TitleWarn, detail });
          break;
        case 404:
          messageService.add({ severity: SeverityConstant.Warn, summary: TitleToastConstant.TitleWarn, detail: 'Resource not found.' });
          break;
        case 409:
          messageService.add({ severity: SeverityConstant.Warn, summary: TitleToastConstant.TitleWarn, detail });
          break;
        case 500:
        case 502:
        case 503:
          messageService.add({ severity: SeverityConstant.Danger, summary: TitleToastConstant.TitleDanger, detail: 'Server error. Please try again later.' });
          break;
        default:
          messageService.add({ severity: SeverityConstant.Danger, summary: TitleToastConstant.TitleDanger, detail });
      }

      return throwError(() => error);
    })
  );
};
