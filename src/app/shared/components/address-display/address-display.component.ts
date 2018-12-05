import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'shared/models/order';

@Component({
  selector: 'address-display',
  templateUrl: './address-display.component.html',
  styleUrls: ['./address-display.component.css']
})
export class AddressDisplayComponent implements OnInit {

  @Input('order') order: Order

  constructor() { }

  ngOnInit() {
  }

}
