import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-assign-employees',
  templateUrl: './assign-employees.component.html',
  styleUrls: ['./assign-employees.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonSelect,
    IonSelectOption
  ]
})
export class AssignEmployeesComponent  implements OnInit {
  employees: Employee[] = [];
  @Input() assignedEmployeeIDs: number[] = [];
  @Output() employeesSelectedEvent = new EventEmitter<Employee[]>();

  constructor(
    private _employeeService: EmployeeService,
    private _roleService: RoleService
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employees = this._employeeService.getEmployees();
  }

  getRoleName(roleId: number): string {
    let role = this._roleService.getRole(roleId);
    if (role) {
      return role.roleName;
    }
    return "Unable to get role";
  }

  onEmployeeChange(event: any) {
    const selectedIDs = event.detail.value.map((emp: Employee) => emp.employeeID);
    this.employeesSelectedEvent.emit(selectedIDs);
  }

  compareEmployees(e1: Employee, e2: Employee): boolean {
    return e1 && e2 ? e1.employeeID === e2.employeeID : e1 === e2;
  }

}
