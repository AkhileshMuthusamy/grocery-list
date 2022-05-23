import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rideco-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss']
})
export class ColorPaletteComponent implements OnInit {

  colors = [
    '#355070',
    '#6D597A',
    '#B56576',
    '#E56B6F',
    '#1D7874',
  ]

  @Input() selected = this.colors[0];
  @Output() selectedColor: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
