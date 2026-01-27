import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'number' | 'date' | 'currency' | 'badge' | 'image' | 'custom';
  format?: (value: any, row?: any) => string;
  cssClass?: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableAction {
  id: string;
  label: string;
  icon?: string;
  cssClass?: string;
  visible?: (row: any) => boolean;
  disabled?: (row: any) => boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'No data available';
  @Input() tableId: string = 'data-table';
  @Input() striped: boolean = true;
  @Input() hoverable: boolean = true;
  @Input() bordered: boolean = true;

  @Output() actionClicked = new EventEmitter<{
    action: string;
    row: any;
  }>();
  @Output() rowClicked = new EventEmitter<any>();
  @Output() sortChanged = new EventEmitter<{
    column: string;
    direction: 'asc' | 'desc';
  }>();

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  onActionClick(actionId: string, row: any, event: Event) {
    event.stopPropagation();
    this.actionClicked.emit({ action: actionId, row });
  }

  onRowClick(row: any) {
    this.rowClicked.emit(row);
  }

  onSort(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sortChanged.emit({
      column: column.key,
      direction: this.sortDirection,
    });
  }

  getCellValue(row: any, column: TableColumn): any {
    const value = row[column.key];

    if (column.format) {
      return column.format(value, row);
    }

    switch (column.type) {
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '-';
      case 'currency':
        return value !== null && value !== undefined
          ? `$${parseFloat(value).toFixed(2)}`
          : '-';
      case 'number':
        return value !== null && value !== undefined
          ? value.toLocaleString()
          : '-';
      default:
        return value !== null && value !== undefined ? value : '-';
    }
  }

  isActionVisible(action: TableAction, row: any): boolean {
    return action.visible ? action.visible(row) : true;
  }

  isActionDisabled(action: TableAction, row: any): boolean {
    return action.disabled ? action.disabled(row) : false;
  }

  getAlignClass(align?: string): string {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  }
}
