import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];
  private apiKey: string = 'SIqo6svWZR48R615R3xw1qYKJK2fPdVD';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _tagHistory: string[] = []

  constructor(private _http: HttpClient) {
    this.loadGifsLocalStorage();
   }

  get tagsHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveGifsLocalStorage();
  }

  private saveGifsLocalStorage() {
    localStorage.setItem('tagHistory', JSON.stringify(this._tagHistory));
  }

  private loadGifsLocalStorage() {
    if (!localStorage.getItem('tagHistory')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('tagHistory')!);

    if (this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0]);

  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this._http.get<SearchResponse>(`${this.baseUrl}/search`, { params })
      .subscribe((response) => {
        this.gifList = response.data;
      })
  }
}