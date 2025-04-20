import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProvincesModel } from '../interfaces/province.model';
import { ICityModel } from '../interfaces/cities.model';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  constructor(private http: HttpClient) {}

  getProvince(): Observable<IProvincesModel[]> {
    return this.http.get<IProvincesModel[]>('api/Provinces/All');
  }

  getCities(provinceCode: number | null): Observable<ICityModel[]> {
    return this.http.get<ICityModel[]>(`api/Provinces/${provinceCode}/Cities`);
  }
}
