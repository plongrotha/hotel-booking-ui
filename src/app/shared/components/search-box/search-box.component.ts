import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {
  @Input() placeholder: string = 'Search...';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  onInputChange(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
    this.search.emit(value);
  }
}
