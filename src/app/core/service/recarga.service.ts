import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User, UserLoginData, UserRegisterData } from '../models/user.model';
import { Operador, RecargaDataRequest } from '../models/recargas.model';




@Injectable({
  providedIn: 'root'
})
export class RecargaService {


   private _apiUrl = `${environment.URL_BASE_API}`;
   

  constructor(private http: HttpClient) {
    
   }

  recargas(recargaData: RecargaDataRequest): Observable<any> {
    // Podríamos validar aquí también si usamos la clase
    return this.http.post(`${this._apiUrl}/recargas`, recargaData).pipe(
      tap((response) => {
        console.log('Recarga exitosa', response);
      }),
      catchError((error) => {
        console.error('Error en la recarga', error);
        return throwError(() => error);
      })
    );
  }

  // Operadores
  getOperadores(): Observable<Operador[]> {
    return this.http.get<Operador[]>(`${this._apiUrl}/operadores`);
  }



}
