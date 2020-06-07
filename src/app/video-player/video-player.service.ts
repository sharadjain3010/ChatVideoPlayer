import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  constructor(private http: HttpClient) { }

  getFileData(fileName): Observable<any> {
    return this.http.get(`../../assets/${fileName}.json`);

  }
}
