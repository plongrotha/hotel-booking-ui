import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
})
export class StatCardComponent {
  @Input() icon: string | any = '';
  @Input() value: string | number = '';
  @Input() label: string = '';
  @Input() color: string = '';
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  @Input() formatAsNumber: boolean = false;
  @Input() numberFormat: string = '1.2-2';
  @Input() isLucideIcon: boolean = false;
}
