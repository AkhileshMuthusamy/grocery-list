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

  @Input() emitOnInit = false;
  @Input() selected = 0;
  @Output() selectedColor: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (this.emitOnInit) {
      this.emitColor(0);
    }
  }

  emitColor(colorIndex: number) {
    if (this.colors.length > colorIndex) {
      this.selected = colorIndex
      this.selectedColor.emit(this.colors[colorIndex]);
    }
  }

}
