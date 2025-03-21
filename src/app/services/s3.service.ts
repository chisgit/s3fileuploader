import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private mockBucketName = 'mock-bucket';
  private mockBaseUrl = 'http://localhost:4200/mock-files';

  constructor() {
    console.log('Initializing S3 service');
  }

  async getPresignedUrl(file: File): Promise<string> {
    try {
      console.log('Generating presigned URL for:', file.name);
      
      // Create a unique key for the file
      const key = `${Date.now()}-${file.name}`;
      
      // For local development, we'll return a mock URL
      const mockUrl = `${this.mockBaseUrl}/${key}`;
      
      console.log('Generated presigned URL:', mockUrl);
      return mockUrl;
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      throw error;
    }
  }

  async uploadFile(file: File): Promise<string> {
    try {
      console.log('Uploading file:', file.name);
      
      // Get the presigned URL first
      const uploadUrl = await this.getPresignedUrl(file);
      
      // Simulate the upload process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('File upload complete');
      return uploadUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
