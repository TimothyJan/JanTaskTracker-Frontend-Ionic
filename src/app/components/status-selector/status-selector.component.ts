import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-status-selector',
  templateUrl: './status-selector.component.html',
  styleUrls: ['./status-selector.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonSelect,
    IonSelectOption
  ]
})
export class StatusSelectorComponent implements OnInit {
  @Input() status?: string = "";
  @Output() statusSelectedEvent = new EventEmitter<string>();

  statuses: string[] = ["Not Started", "Active", "Completed"];

  constructor() { }

  ngOnInit() {}

  onStatusChange(selectedValue: any) {
    this.status = selectedValue.detail.value;
    this.statusSelectedEvent.emit(this.status);
  }

}
