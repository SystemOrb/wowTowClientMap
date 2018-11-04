import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styles: []
})
export class PublicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
