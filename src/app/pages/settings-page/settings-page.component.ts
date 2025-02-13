import { Component, inject, effect } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-settings-page',
  imports: [ReactiveFormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})

export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

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

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

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
