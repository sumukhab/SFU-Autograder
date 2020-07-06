import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = 'https://cs-learnlab-02.csil.sfu.ca/jupyter';

  constructor(private httpClient: HttpClient) {}
}
