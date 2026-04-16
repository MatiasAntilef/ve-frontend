import { Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  selectedFile!: File;

  async getToken(): Promise<string> {
    let token = '';
    this.oidcSecurityService.getAccessToken().subscribe((t) => (token = t));
    return token;
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
  //RECORDATORIO: MEJORAR UIUIUI!
  async uploadVideo(file: File) {
    const res = await fetch('https://u6fugn1c4l.execute-api.sa-east-1.amazonaws.com/upload-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await this.getToken()}`,
      },
      body: JSON.stringify({
        fileName: file.name,
      }),
    });

    const { url, key } = await res.json();

    const upload = await fetch(url, {
      method: 'PUT',
      body: file,
    });

    // RECORDATORIO: AGREGAR UI MODAL
    if (!upload.ok) {
      throw new Error('Error subiendo archivo a S3');
    }

    alert('Ready');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file && file.type === 'video/mp4') {
      this.selectedFile = file;
      this.uploadVideo(file);
    } else {
      console.error('Solo mp4');
    }
  }
}
