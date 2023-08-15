import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTPResponse } from '../../model/HTTPResponse';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient){

   }

   public getAllMenu(): Observable<HTTPResponse<[]>> {
    return this.http.get<HTTPResponse<[]>>(
      `${environment.server_Url}menu`
    );
  }
}
