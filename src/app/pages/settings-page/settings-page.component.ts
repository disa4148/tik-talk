import { Component, inject, effect, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  imports: [ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})

export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: ['', Validators.required],
    stack: [[] as string[]],
  });

  constructor() {
    effect(() => {
      const profile = this.profileService.me();
      if (profile) {
        this.form.patchValue(profile);
      }
    });
  }

  ngAfterViewInit() {
    this.avatarUploader.avatar
  }

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    }

    firstValueFrom(
      this.profileService.patchProfile(this.form.value as Partial<Profile>)
    );
  }

  addSkill(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const value = input.value.trim();

    if ((event.key === 'Enter' || event.key === ',') && value) {

      const currentStack = this.form.value.stack || [];
      if (!currentStack.includes(value)) {
        this.form.patchValue({ stack: [...currentStack, value] });
      }

      input.value = '';
    }
  }

  removeSkill(skill: string) {
    const updatedStack =
      this.form.value.stack?.filter((s) => s !== skill) || [];
    this.form.patchValue({ stack: updatedStack });
  }
}
