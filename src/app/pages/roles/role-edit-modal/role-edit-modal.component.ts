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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { Department } from 'src/app/models/department.model';
import { Role } from 'src/app/models/role.model';
import { DepartmentService } from 'src/app/services/department.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-edit-modal',
  templateUrl: './role-edit-modal.component.html',
  styleUrls: ['./role-edit-modal.component.scss'],
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
    IonSelect,
    IonSelectOption
  ]
})
export class RoleEditModalComponent  implements OnInit {
  @Input() roleID: number = -1;
  departments: Department[] = [];
  role: Role = {roleID: -1, roleName: "", departmentID: -1};

  constructor(
    private modalCtrl: ModalController,
    private _departmentService: DepartmentService,
    private _roleService: RoleService
  ) { }

  ngOnInit() {
    this.getRole();
    this.departments = this._departmentService.getDepartments();
  }

  /** Get Employee */
  getRole(): void {
    this.role = this._roleService.getRole(this.roleID)!;
  }

  /** Camcel and close modal */
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  /** Confirm save and close modal */
  confirm() {
    return this.modalCtrl.dismiss(this.roleID, 'confirm');
  }

  /** save Changes */
  saveChanges(): void {
    this._roleService.updateRole(this.role);
    this._roleService.notifyRolesChanged();
  }

}
