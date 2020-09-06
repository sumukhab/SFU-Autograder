import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditorHandlerService {

  constructor(private http: HttpClient) { }

  saveCode(script: string, filename: string) {
    const body = { script: script, filename: filename }
    return this.http.post<any>(`${environment.api_url}/save`, body)
      .pipe(map(info => {
        console.log(info);

      }));
  }

  executeCode(filename: string, language: string, inputs: Array<string>) {
    const body = { filename: filename, language: language, inputs: inputs }
    return this.http.post<any>(`${environment.api_url}/execute`, body)
      .pipe(map(output => {
        console.log(output);

      }));

  }
}
