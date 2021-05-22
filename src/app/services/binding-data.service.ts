import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Arrays } from '../model/Arrays';
@Injectable({
  providedIn: 'root'
})
export class BindingDataService {

  constructor(private http:HttpClient) { }

  save(arraysList:Arrays):Observable<any>{
    return this.http.post<Observable<Arrays>>("http://localhost:9000/save",arraysList);
  }
  getForm(id):Observable<any>{
    return this.http.get<Observable<Arrays>>(`http://localhost:9000/getForm/${id}`);
  }

  update(arraysList:Arrays):Observable<any>{
    return this.http.put<Observable<Arrays>>("http://localhost:9000/save",arraysList);
  }
}
