import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-master-layout',
  imports: [RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './master-layout.component.html',
  styleUrl: './master-layout.component.css',
})
export class MasterLayoutComponent {}
