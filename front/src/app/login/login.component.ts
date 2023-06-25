import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // TODO: Perform login logic
      console.log('Username:', username);
      console.log('Password:', password);

      // Reset form after successful submission
      this.loginForm.reset();
    } else {
      // Handle form validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}

