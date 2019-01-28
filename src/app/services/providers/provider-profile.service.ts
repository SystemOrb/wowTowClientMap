import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENVIROMENT_LOCAL } from 'src/app/Routes/routes';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class ProviderProfileService {
  // Todos los servicios que podamos necesitar de la app wootow Grueros
  constructor(private _http: HttpClient) { }
  GetWooTowDocs(providerKey: string) {
    const url = `${ENVIROMENT_LOCAL}/admin/documents/provider/${providerKey}`;
    return this._http.get(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>(err);
      }),
   );

  }
}
