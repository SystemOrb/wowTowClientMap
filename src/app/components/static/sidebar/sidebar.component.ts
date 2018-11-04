import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/customer/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this._auth.logout();
  }

}
