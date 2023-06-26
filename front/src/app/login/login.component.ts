import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showLoginForm: boolean = true;
  loginError: string = '';
  loginSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  toggleForm(): void {
    this.showLoginForm = !this.showLoginForm;
    this.loginError = '';
    this.loginSuccess = false;
    this.loginForm.reset();
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const loginData = { username, password };

      this.http.post('accounts/login/', loginData).subscribe(
        (response) => {
          this.loginSuccess = true;
          this.loginError = '';
          console.log('Login success:', response);
          // Reset form after successful submission
          this.loginForm.reset();
        },
        (error: HttpErrorResponse) => {
          this.loginSuccess = false;
          if (error.status === 401) {
            this.loginError = 'Invalid username or password.';
          } else {
            this.loginError = 'An error occurred. Please try again later.';
          }
          console.error('Login error:', error);
        }
      );
    } else {
      // Handle form validation errors
      this.markLoginFormFieldsAsTouched();
    }
  }

  markLoginFormFieldsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }
}
