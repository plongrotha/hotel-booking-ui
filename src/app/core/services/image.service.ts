import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ImageUploadResponse {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'http://localhost:8080/api/v1/images';

  constructor(private http: HttpClient) {}

  uploadImage(
    file: File
  ): Observable<{ code: number; data: ImageUploadResponse; message: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{
      code: number;
      data: ImageUploadResponse;
      message: string;
    }>(`${this.apiUrl}/upload`, formData);
  }

  getImageUrl(fileName: string): string {
    return `${this.apiUrl}/${fileName}`;
  }
}
