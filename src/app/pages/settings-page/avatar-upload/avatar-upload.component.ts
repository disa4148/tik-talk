import { Component, signal } from '@angular/core';
import { ImageUp } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { DragAndDropDirective } from '../../../helpers/directives/drag-and-drop.directive';

@Component({
  selector: 'app-avatar-upload',
  imports: [LucideAngularModule, DragAndDropDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  readonly imageUpIcon = ImageUp;

  preview = signal<string>('/assets/images/avatar-placeholder.png');

  avatar: File | null = null;

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0] as File;
    this.processFile(file);
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null) {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
