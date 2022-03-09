import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Provide email.' 
      },
      { 
        type: 'pattern', 
        message: 'Email is not valid.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Password is required.' 
      },
      { 
        type: 'minlength', 
        message: 'Password length should be 6 characters long.' 
      }
    ]
  };

  constructor(
    public router: Router,
    private firebaseAuthService: FirebaseAuthService,
    private fb: FormBuilder
  ) { 
    
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
  signIn(value) {
    this.firebaseAuthService.login(value)
      .then((response) => {
        this.router.navigateByUrl('home');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToSignup() {
    this.router.navigateByUrl('register');
  }

}
