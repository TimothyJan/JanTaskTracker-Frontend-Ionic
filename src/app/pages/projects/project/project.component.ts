import { Component, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonCardTitle,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
  ActionSheetController,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipsisVerticalSharp } from 'ionicons/icons';
import { Project } from 'src/app/models/project.model';
import { ProjectTaskService } from 'src/app/services/project-task.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectTaskComponent } from "../project-task/project-task.component";
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';
import { ProjectEditModalComponent } from 'src/app/components/modals/project-edit-modal/project-edit-modal.component';
import { ProjectTaskCreateModalComponent } from 'src/app/components/modals/project-task-create-modal/project-task-create-modal.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonGrid,
    IonRow,
    IonCol,
    IonCardContent,
    IonCardTitle,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    ProjectTaskComponent
]
})

export class ProjectComponent implements OnInit {
  @Input() projectId: number = 0;
  project : Project = new Project(0, "", "", "Not Started", new Date(), new Date());
  listOfProjectTaskIds: number[] = [];

  projectNameInvalid: boolean = false;
  descriptionInvalid: boolean = false;

  startDateString: string = '';
  dueDateString: string = '';

  constructor(
    private _projectService: ProjectService,
    private _projectTaskService: ProjectTaskService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private _toastService: ToastService
  ) {
    addIcons({ ellipsisVerticalSharp });
  }

  ngOnInit() {
    this.getProjectById();
    this.getListOfProjectTaskIdsByProjectId();

    // Add this subscription for project changes
    this._projectService.projectsChanged$.subscribe(() => {
      this.getProjectById(); // Refresh the project data
    });

    // Subscribe to changes in the task list
    this._projectTaskService.projectTasksChanged$.subscribe(() => {
      this.getListOfProjectTaskIdsByProjectId(); // Refresh the list after a task is deleted
    });
  }

  /** Get Project by Id */
  getProjectById(): void {
    this.project = this._projectService.getProjectById(this.projectId);
  }

  /** Get list of ProjectTaskIds by ProjectId */
  getListOfProjectTaskIdsByProjectId(): void {
    this.listOfProjectTaskIds = this._projectTaskService.getListOfProjectTaskIdsByProjectIds(this.projectId);
  }

  /** Opens Action Sheet for Project */
  async presentProjectActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.project.projectName,
      buttons: [
        {
          text: 'Edit Project',
          handler: () => this.openProjectEditModal(),
        },
        {
          text: 'Add Project Task',
          handler: () => this.openProjectTaskCreateModal(),
        },
        {
          text: 'Delete Project',
          role: 'destructive',
          handler: () => this.onDelete(this.project.projectId),
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });
    await actionSheet.present();
  }

  /** Opens Project Task Create Modal */
  async openProjectTaskCreateModal() {
    const modal = await this.modalCtrl.create({
      component: ProjectTaskCreateModalComponent,
      componentProps: {
        projectId: this.projectId
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // console.log(data, role);
    }
  }

  /** Opens Project Edit Edit Modal */
  async openProjectEditModal() {
    const modal = await this.modalCtrl.create({
      component: ProjectEditModalComponent,
      componentProps: {
        projectId: this.projectId
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // console.log(data, role);
    }
  }

  onDelete(projectId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this project?');
    if (confirmDelete) {
      this._projectService.deleteProject(projectId);
      this._toastService.presentSuccessToast("Department deleted.");
    }
  }

}
