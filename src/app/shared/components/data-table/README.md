# DataTable Component

A reusable, feature-rich table component for Angular applications.

## Features

- ✅ Sortable columns
- ✅ Custom cell rendering (text, number, date, currency, badge, image, custom HTML)
- ✅ Row actions with visibility/disabled conditions
- ✅ Loading state
- ✅ Empty state
- ✅ Striped/hoverable/bordered styles
- ✅ Click events on rows
- ✅ Responsive design
- ✅ TypeScript support

## Usage

### Basic Example

```typescript
import { Component } from "@angular/core";
import { DataTableComponent, TableColumn, TableAction } from "./shared/components/data-table/data-table.component";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [DataTableComponent],
  template: ` <app-data-table [columns]="columns" [data]="users" [actions]="actions" [loading]="isLoading" tableId="users-table" emptyMessage="No users found" (actionClicked)="onAction($event)" (rowClicked)="onRowClick($event)" (sortChanged)="onSort($event)"></app-data-table> `,
})
export class UsersComponent {
  columns: TableColumn[] = [
    { key: "id", label: "ID", sortable: true, width: "80px" },
    { key: "username", label: "Username", sortable: true },
    { key: "email", label: "Email", sortable: true },
    {
      key: "age",
      label: "Age",
      type: "number",
      sortable: true,
      align: "center",
    },
    {
      key: "status",
      label: "Status",
      type: "badge",
      format: (value) => (value === "active" ? "badge-success" : "badge-danger"),
    },
    {
      key: "createdAt",
      label: "Created",
      type: "date",
      sortable: true,
    },
  ];

  actions: TableAction[] = [
    {
      id: "edit",
      label: "Edit",
      cssClass: "btn-primary",
    },
    {
      id: "delete",
      label: "Delete",
      cssClass: "btn-danger",
      visible: (row) => row.role !== "admin", // Hide for admins
    },
    {
      id: "activate",
      label: "Activate",
      disabled: (row) => row.status === "active", // Disable if already active
    },
  ];

  users = [
    { id: 1, username: "john", email: "john@example.com", age: 30, status: "active", createdAt: new Date() },
    { id: 2, username: "jane", email: "jane@example.com", age: 25, status: "inactive", createdAt: new Date() },
  ];

  isLoading = false;

  onAction(event: { action: string; row: any }) {
    console.log("Action:", event.action, "Row:", event.row);
    if (event.action === "edit") {
      // Edit user
    } else if (event.action === "delete") {
      // Delete user
    }
  }

  onRowClick(row: any) {
    console.log("Row clicked:", row);
  }

  onSort(event: { column: string; direction: "asc" | "desc" }) {
    console.log("Sort:", event);
    // Implement sorting logic
  }
}
```

### Advanced Examples

#### With Custom Formatting

```typescript
columns: TableColumn[] = [
  {
    key: 'price',
    label: 'Price',
    type: 'currency'
  },
  {
    key: 'name',
    label: 'Full Name',
    format: (value, row) => `${row.firstName} ${row.lastName}`
  },
  {
    key: 'avatar',
    label: 'Avatar',
    type: 'image'
  }
];
```

#### With Custom HTML

```typescript
columns: TableColumn[] = [
  {
    key: 'description',
    label: 'Description',
    type: 'custom',
    format: (value, row) => `<strong>${row.name}</strong><br><small>${value}</small>`
  }
];
```

## API

### Inputs

| Property       | Type            | Default               | Description                 |
| -------------- | --------------- | --------------------- | --------------------------- |
| `columns`      | `TableColumn[]` | `[]`                  | Column definitions          |
| `data`         | `any[]`         | `[]`                  | Table data                  |
| `actions`      | `TableAction[]` | `[]`                  | Row actions                 |
| `loading`      | `boolean`       | `false`               | Show loading state          |
| `emptyMessage` | `string`        | `'No data available'` | Message when table is empty |
| `tableId`      | `string`        | `'data-table'`        | ID attribute for the table  |
| `striped`      | `boolean`       | `true`                | Enable striped rows         |
| `hoverable`    | `boolean`       | `true`                | Enable hover effect         |
| `bordered`     | `boolean`       | `true`                | Enable borders              |

### Outputs

| Event           | Payload                                          | Description                           |
| --------------- | ------------------------------------------------ | ------------------------------------- |
| `actionClicked` | `{ action: string, row: any }`                   | Emitted when action button is clicked |
| `rowClicked`    | `any`                                            | Emitted when row is clicked           |
| `sortChanged`   | `{ column: string, direction: 'asc' \| 'desc' }` | Emitted when sort changes             |

### Types

#### TableColumn

```typescript
interface TableColumn {
  key: string; // Property key in data object
  label: string; // Column header text
  sortable?: boolean; // Enable sorting
  type?: "text" | "number" | "date" | "currency" | "badge" | "image" | "custom";
  format?: (value: any, row?: any) => string; // Custom formatter
  cssClass?: string; // CSS class for cells
  width?: string; // Column width
  align?: "left" | "center" | "right"; // Text alignment
}
```

#### TableAction

```typescript
interface TableAction {
  id: string; // Action identifier
  label: string; // Button text
  icon?: string; // HTML icon
  cssClass?: string; // CSS class for button
  visible?: (row: any) => boolean; // Visibility condition
  disabled?: (row: any) => boolean; // Disabled condition
}
```

## Styling

The component uses CSS classes that can be customized:

- `.data-table` - Main table
- `.badge-success`, `.badge-danger`, etc. - Badge styles
- `.btn-action` - Action buttons
- Override in your global styles or component styles

## Example Usage in Existing Components

Replace your existing tables with this component:

```typescript
// Before
<table class="data-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let user of users">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
    </tr>
  </tbody>
</table>

// After
<app-data-table
  [columns]="[
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' }
  ]"
  [data]="users"
></app-data-table>
```
