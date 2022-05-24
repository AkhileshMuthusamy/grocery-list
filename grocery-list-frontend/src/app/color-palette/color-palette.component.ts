import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rideco-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss']
})
export class ColorPaletteComponent implements OnInit {

  // List of colors to appear on view
  colors = [
    '#355070',
    '#6D597A',
    '#B56576',
    '#E56B6F',
    '#1D7874',
  ]

  @Input() emitOnInit = false;
  @Input() selected = 0; // Highlights the selected color in view
  @Output() selectedColor: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // Emit first color in the array to the parent component when initialized
    if (this.emitOnInit) {
      this.emitColor(0);
    }
  }

  /**
   * Function to return selected color to the parent component
   * @param colorIndex Provide index number of the colors array
   */
  emitColor(colorIndex: number) {
    if (this.colors.length > colorIndex) {
      this.selected = colorIndex
      this.selectedColor.emit(this.colors[colorIndex]);
    }
  }

}
