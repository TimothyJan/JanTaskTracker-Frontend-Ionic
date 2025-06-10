import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IonList,
  IonListHeader,
  IonItem,
  IonText,
} from '@ionic/angular/standalone';
import { Subject, takeUntil } from 'rxjs';
import { ProjectTask } from 'src/app/models/project-task.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectTaskService } from 'src/app/services/project-task.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-assigned-employee-list',
  templateUrl: './assigned-employee-list.component.html',
  styleUrls: ['./assigned-employee-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonList,
    IonListHeader,
    IonItem,
    IonText,
  ]
})
export class AssignedEmployeeListComponent  implements OnInit {
  @Input() projectTaskId: number = 0;
  projectTask: ProjectTask = new ProjectTask(0, 0, "", "", "Not Started");
  private destroy$ = new Subject<void>();

  constructor(
    private _projectTaskService: ProjectTaskService,
    private _employeeService: EmployeeService,
    private _roleService: RoleService
  ) { }

  ngOnInit() {
    this.getProjectTaskById();

    // Subscribe to project task changes
    this._projectTaskService.projectTasksChanged$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.getProjectTaskById();
    });
  }

  /** Get ProjectTask by Id */
  getProjectTaskById(): void {
    this.projectTask = this._projectTaskService.getProjectTaskById(this.projectTaskId);
  }

  /** Get User by employeeId */
  getEmployeeNameByEmployeeId(employeeId: number): string {
    let assignedEmployee = this._employeeService.getEmployee(employeeId);
    if (assignedEmployee) {
       return assignedEmployee.name;
    }
    return "Unassigned";
  }

  /** Get roleName with roleId */
  getRoleNameByEmployeeId(employeeId: number): string {
    let assignedEmployee = this._employeeService.getEmployee(employeeId);
    if (assignedEmployee) {
      let roleId = assignedEmployee.roleId;
      if (roleId != -1) {
        return this._roleService.getRole(roleId)!.roleName
      }
      else {
        return "Unable to get role";
      }
    }
    return "Unable to get employee";
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
