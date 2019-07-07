import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http'  
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  public _baseApiUsersRepository = 'https://api.github.com/users/';
  
  constructor(private _http: HttpClient) {}  
     
  getUserRepository(url: string) : Observable<any[]>{  
    return this._http.get<any[]>(url) ;                  
  }  
 


 
}
