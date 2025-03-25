import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { SidemenuComponent } from "../../components/sidemenu/sidemenu.component";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  standalone: true,
  imports: [SidemenuComponent, IonContent],
})
export class RolesComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
