import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private launchesUrl = 'https://api.spacexdata.com/v4/launches/';
  private rocketsUrl = 'https://api.spacexdata.com/v4/rockets/';

  constructor(private http: HttpClient) {
  }

  getRocket(id: string): Observable<any> {

    return this.http.get<any>(`${this.rocketsUrl}${id}`);
  }
}
