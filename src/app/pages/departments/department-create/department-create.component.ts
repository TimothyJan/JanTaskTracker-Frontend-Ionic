import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast.service';

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

  constructor(
    private _departmentService: DepartmentService,
    private _toastService: ToastService
  ) {}

  onSubmit() {
    // Make Uppercase
    this.departmentForm.controls["departmentName"].setValue(this.departmentForm.controls["departmentName"].value.toUpperCase());
    if (this.departmentForm.valid) {
      // Check for duplicates
      if (!this._departmentService.checkDuplicates(this.departmentForm.controls["departmentName"].value)) {
        this._departmentService.createDepartment(this.departmentForm.value);
        this._toastService.presentSuccessToast("Department created!");
        this.departmentForm.reset();
        this._departmentService.notifyDepartmentsChanged();
      }
      else {
        this._toastService.presentErrorToast("Department already exists.");
      }
    }
    else {
      this._toastService.presentErrorToast("Department failed to be created.");
    }
  }

}
