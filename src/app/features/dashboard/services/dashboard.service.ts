import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDashboardModel } from '../interfaces/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboard(): Observable<IDashboardModel> {
    return this.http.get<IDashboardModel>('api/Dashboard');
  }
}
