import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonInput
} from '@ionic/angular/standalone'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonInput
  ]
})
export class InputComponent {
  @Input() value: string = "";
  @Input() label: string = "Text";
  placeholder: string = `Enter ${this.label}`;

  @Output() valueChanged = new EventEmitter<string>();

  onInputChange(event: any) {
    this.value = event.target.value;
    this.valueChanged.emit(this.value);
  }

  constructor() { }

}
