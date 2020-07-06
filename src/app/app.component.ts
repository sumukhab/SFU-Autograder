import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SFUAutograder';

  constructor(private svc: ApiService,private http:HttpClient){
    console.log("Got the service");
  }

  ngOnInit(){
    let obs = this.http.get('https://cors-anywhere.herokuapp.com/https://cs-learnlab-02.csil.sfu.ca/jupyter/authorizations/token')
    obs.subscribe((response)=> console.log(response));
  }

}
