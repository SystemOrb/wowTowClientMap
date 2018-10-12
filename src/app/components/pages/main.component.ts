import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
