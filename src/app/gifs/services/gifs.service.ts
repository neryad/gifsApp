import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'diiBwiB6Z4E1qfhMQ2FbNQ6cI8iWQeYV';
  private url = 'https://api.giphy.com/v1/gifs';
  private _histoial: string[] = [];

  public resultado: Gif[] = [];

  get historial() {
    return [...this._histoial];
  }

  constructor(private http: HttpClient) {
    this._histoial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if (localStorage.getItem('historial')) {
    //   this._histoial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._histoial.includes(query)) {
      this._histoial.unshift(query);
      this._histoial = this._histoial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._histoial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.url}/search`, { params })
      .subscribe((res) => {
        this.resultado = res.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultado));
      });
  }
}
