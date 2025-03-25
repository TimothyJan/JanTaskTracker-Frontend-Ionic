import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { SidemenuComponent } from "../../components/sidemenu/sidemenu.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [SidemenuComponent, IonContent],
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
