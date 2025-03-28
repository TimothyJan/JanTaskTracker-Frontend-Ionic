import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton],
})
export class DepartmentCreateComponent {

  departmentForm: FormGroup = new FormGroup({
    departmentName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
  });

  constructor(private _departmentService: DepartmentService) {}

  onSubmit(): void {
    if (this.departmentForm.valid) {
      this._departmentService.addDepartment(this.departmentForm.value);
      this.departmentForm.reset();
      this._departmentService.notifyDepartmentsChanged();
    }
  }

}
