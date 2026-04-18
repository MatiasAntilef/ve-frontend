import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pais {
  name: {
    common: string;
  };
  capital: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,population,flags';

  obtenerPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiUrl);
  }
}
