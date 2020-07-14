import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  userName:string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {

  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
