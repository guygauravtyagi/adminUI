import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent {

  @Input() imageSrc = './../../../assets/icons/edit.png';
  @Output() buttonClick: EventEmitter<Event> = new EventEmitter<Event>();

  emitClick(event: Event) {
    this.buttonClick.emit(event);
  }
}
