import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-round-button',
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.css']
})
export class RoundButtonComponent implements OnChanges {

  @Input() buttonName = '0';
  @Input() isDisabled = false;
  @Input() isActive = false;

  @Output() buttonClicked: EventEmitter<Event> = new EventEmitter<Event>();

  ngOnChanges(changes: SimpleChanges): void {
    this.isDisabled = changes['isDisabled']?.currentValue;
    this.isActive = changes['isActive']?.currentValue;
  }

  buttonPress(event: Event) {
    this.buttonClicked.emit(event);
    console.log('Hello');
  }

}
