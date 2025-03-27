import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonButton, IonIcon, IonInput, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createSharp, trashSharp, saveSharp } from 'ionicons/icons';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
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
    IonCol
  ]
})
export class DepartmentListComponent implements OnInit {

  departments: Department[] = [];
  editModeDepartmentId: number | null = null;

  constructor(private _departmentService: DepartmentService) {
    addIcons({ createSharp, trashSharp, saveSharp });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  /** Load all Departments */
  loadDepartments(): void {
    this.departments = this._departmentService.getDepartments();
  }

  /** Enter Edit mode for editting Department list */
  enterEditMode(departmentId: number): void {
    this.editModeDepartmentId = departmentId;
  }

  /** Update Department and leave Edit mode */
  saveChanges(department: Department): void {
    this._departmentService.updateDepartment(department);
    this.editModeDepartmentId = null;
    this.loadDepartments(); // Reload departments to reflect changes
  }

  /** Delete Department */
  onDelete(departmentID: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this department?');
    if (confirmDelete) {
      this._departmentService.deleteDepartment(departmentID);
      this.loadDepartments(); // Reload departments after deletion
    }
  }
}
