import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
  @Input() label: string = 'Image';
  @Input() imagePreviewUrl: string | null = null;
  @Input() imageFileName: string | null = null;
  @Input() isUploading: boolean = false;
  @Input() uploadError: string | null = null;
  @Input() inputId: string = 'imageUpload';

  @Output() fileSelected = new EventEmitter<Event>();
  @Output() clearImage = new EventEmitter<void>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  onFileSelected(event: Event): void {
    this.fileSelected.emit(event);
  }

  onClearImage(): void {
    this.clearImage.emit();
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
