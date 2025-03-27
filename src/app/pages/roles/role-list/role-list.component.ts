import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { Role } from 'src/app/models/role.model';
import { DepartmentService } from 'src/app/services/department.service';
import { RoleService } from 'src/app/services/role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonButton, IonIcon, IonInput, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createSharp, trashSharp, saveSharp } from 'ionicons/icons';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption
  ]
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];
  departments: Department[] = [];
  editModeRoleId: number | null = null;
  isLoading: boolean = false;

  constructor(
    private _departmentService: DepartmentService,
    private _roleService: RoleService
  ) {
    addIcons({ createSharp, trashSharp, saveSharp });
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadRoles();
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.departments = this._departmentService.getDepartments();
    this.isLoading = false;
  }

  /** Load all roles */
  loadRoles(): void {
    this.isLoading = true;
    this.roles = this._roleService.getRoles();
    this.isLoading = false;
  }

  /** Get Department name from DepartmentID */
  getDepartmentName(departmentID: number): string | undefined {
    const department = this.departments.find(dep => dep.departmentID == departmentID);
    return department ? department.departmentName : undefined;
  }

  /** Enter Edit mode for editting role list */
  enterEditMode(roleId: number): void {
    this.editModeRoleId = roleId;
  }

  /** Leave Edit mode and save changes */
  saveChanges(role: Role): void {
    this._roleService.updateRole(role);
    this.editModeRoleId = null;
    this.loadRoles(); // Reload roles to reflect changes
  }

  /** Delete Role */
  onDelete(roleID: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this role?');
    if (confirmDelete) {
      this._roleService.deleteRole(roleID);
      this.loadRoles(); // Reload roles after deletion
    }
  }

}
