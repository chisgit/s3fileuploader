import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { S3Service } from '../services/s3.service';

@Component({
  selector: 'app-upload',
  template: `
    <div class="upload-container">
      <h2>Upload File to S3</h2>
      <input type="file" (change)="onFileSelected($event)" />
      <button (click)="uploadFile()" [disabled]="!selectedFile || uploading">Upload</button>
      <div *ngIf="uploading">Uploading...</div>
      <div *ngIf="uploadUrl">File uploaded successfully! URL: {{ uploadUrl }}</div>
      <div *ngIf="error" class="error">{{ error }}</div>
    </div>
  `,
  styles: [`
    .upload-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
    .error {
      color: red;
      margin-top: 10px;
    }
  `],
  imports: [CommonModule]
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploading = false;
  uploadUrl: string | null = null;
  error: string | null = null;

  constructor(private s3Service: S3Service) {}

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.selectedFile = target.files[0];
      this.error = null;
    }
  }

  async uploadFile() {
    if (!this.selectedFile) return;

    this.uploading = true;
    this.error = null;
    try {
      const url = await this.s3Service.uploadFile(this.selectedFile);
      this.uploadUrl = url;
      console.log('Upload successful:', url);
    } catch (error) {
      console.error('Upload failed:', error);
      this.error = 'Failed to upload file';
      this.uploadUrl = null;
    } finally {
      this.uploading = false;
    }
  }
}
