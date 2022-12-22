import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() name = 'Button';
  @Output() clickButton: EventEmitter<Event> = new EventEmitter<Event>()

  buttonClicked(event: Event) {
    this.clickButton.emit(event);
  }
}
