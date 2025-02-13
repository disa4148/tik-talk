import { Component, effect, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-settings-page',
  imports: [ReactiveFormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  constructor() {
    effect(() => {
      const profile = this.profileService.me();
      if (profile) {
        this.form.patchValue(profile);
      }
    })
  }

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: ['', Validators.required],
    stack: [[] as string[]],
  })

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    firstValueFrom(this.profileService.patchProfile(this.form.value as Partial<Profile>));
  }
}
