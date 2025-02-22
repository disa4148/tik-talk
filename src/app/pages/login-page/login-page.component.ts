import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

interface LoginForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})

export class LoginPageComponent {
  authService = inject(AuthService);

  router = inject(Router);

  form = new FormGroup<LoginForm>({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  isPasswordVisible = signal<boolean>(false);
  onSubmit() {
    if (this.form.valid) {
      this.authService
        .login(
          this.form.value as {
            username: string;
            password: string;
          }
        )
        .subscribe((res) => {
          this.router.navigate(['']);
          console.log(res);
        });
    }
  }
}
