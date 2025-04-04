import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class InputComponent implements OnInit {
  @Input() value: string = "";
  @Output() valueChanged = new EventEmitter<string>();

  // Optionally add input configuration
  @Input() label: string = "Text Input";
  placeholder: string = `Enter ${this.label}`;

  onInputChange(event: any) {
    this.value = event.target.value;
    this.valueChanged.emit(this.value);
  }

  constructor() { }

  ngOnInit() {}

}
