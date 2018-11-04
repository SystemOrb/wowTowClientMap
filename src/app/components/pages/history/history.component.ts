import { Component, OnInit } from '@angular/core';
import { GraphicalsOrdersService } from '../../../services/maps/graphicals-orders.service';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public GraphicOrders: any[] = [];
  constructor(private _graphical: GraphicalsOrdersService) { }

  ngOnInit() {
    this.loadCustomerOrders();
  }

  loadCustomerOrders() {
    this._graphical.customerOrders().subscribe(
      (graphicals: PartialObserver<any> | any): void => {
        if (graphicals.status) {
          this.GraphicOrders = graphicals.allOrder;
          console.log(this.GraphicOrders);
        }
      }
    );
  }
}
