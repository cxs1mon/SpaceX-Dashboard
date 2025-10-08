import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  private launchesUrl = 'https://api.spacexdata.com/v4/launches/';
  private rocketsUrl = 'https://api.spacexdata.com/v4/rockets/';
  private launchpadUrl = 'https://api.spacexdata.com/v4/launchpads/';
  private payloadUrl = 'https://api.spacexdata.com/v4/payloads/';
  private launchIdSubject = new BehaviorSubject<string | null>(null);
  launchId$ = this.launchIdSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getLaunches(): Observable<any[]> {
    return this.http.get<any[]>(this.launchesUrl);
  }

  getRocket(id: string): Observable<any> {
    return this.http.get<any>(`${this.rocketsUrl}${id}`);
  }

  getLaunchpad(id: string): Observable<any> {
    return this.http.get<any>(`${this.launchpadUrl}${id}`);
  }

  getLaunchById(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.launchesUrl}${id}`);
  }

  getPayload(id: string): Observable<any> {
    return this.http.get<any>(`${this.payloadUrl}${id}`);
  }

  setLaunchId(id: string) {
    this.launchIdSubject.next(id);
  }
}
