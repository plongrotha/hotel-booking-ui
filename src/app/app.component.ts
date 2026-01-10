import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterLayoutComponent } from './shared/components/master-layout/master-layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MasterLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hotel-booking-ui';
}
