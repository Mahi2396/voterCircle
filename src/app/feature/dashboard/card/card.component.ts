import { Component, Input, OnInit } from '@angular/core';
import { Recipes } from './../dashboard.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  /** Hold recipe object */
  @Input() recipe: Recipes;
  constructor() { }

  ngOnInit() {
  }

}
