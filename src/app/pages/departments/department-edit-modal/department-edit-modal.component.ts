import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ModalController,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
  IonInput,
} from '@ionic/angular/standalone';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
@Component({
  selector: 'app-department-edit-modal',
  templateUrl: './department-edit-modal.component.html',
  styleUrls: ['./department-edit-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonTitle,
    IonToolbar,
    IonInput,
  ]
})
export class DepartmentEditModalComponent implements OnInit {
  @Input() departmentID: number = -1;
  department: Department = {departmentID: -1, departmentName: ""};

  constructor(
    private modalCtrl: ModalController,
    private _departmentService: DepartmentService
  ) { }

  ngOnInit() {
    this.getEmployee();
  }

  /** Get Employee */
  getEmployee(): void {
    this.department = this._departmentService.getDepartment(this.departmentID)!;
  }

  /** Cancel and close modal */
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  /** Confirm save */
  confirm() {
    this.saveChanges();
    return this.modalCtrl.dismiss(this.departmentID, 'confirm');
  }

  /** Save Changes */
  saveChanges(): void {
    this._departmentService.updateDepartment(this.department);
    this._departmentService.notifyDepartmentsChanged();
  }

}
