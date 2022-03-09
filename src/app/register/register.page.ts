import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { from } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  

  error_msg = {
    'firstName': [
      { 
        type: 'required', 
        message: 'Provide your first name.' 
      }
    ],
    'lastName': [
      { 
        type: 'required', 
        message: 'Provide your last name.' 
      }
    ],
    'gender': [
      { 
        type: 'required', 
        message: 'Provide your gender.' 
      }
    ],
    'phoneNumber': [
      { 
        type: 'required', 
        message: 'Provide a phone number.' 
      },
      { 
        type: 'pattern', 
        message: 'Phone number is not valid.' 
      }
    ],
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

  GENDER_LIST = [
    { name: 'Male', value: 'Male', checked: false},
    { name: 'Female', value: 'Female' },
    { name: 'Other', value: 'Other' },
  ];
  constructor(
    private router: Router,
    private firebaseAuthService: FirebaseAuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])),
      gender: this.fb.array([], [Validators.required]),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
    this.onLoadCheckboxStatus();
  }

  updateCheckControl(cal, o) {
    if (o.checked) {
      cal.push(new FormControl(o.value));
    } else {
      cal.controls.forEach((item: FormControl, index) => {
        if (item.value == o.value) {
          cal.removeAt(index);
          return;
        }
      });
    }
  }

  onLoadCheckboxStatus() {
    const gender: FormArray = this.userForm.get('gender') as FormArray;
    this.GENDER_LIST.forEach(o => {
      this.updateCheckControl(gender, o);
    })
  }

  onSelectionChange(e, i) {
    const gender: FormArray = this.userForm.get('gender') as FormArray;
    this.GENDER_LIST[i].checked = e.target.checked;
    this.updateCheckControl(gender, e.target);
  }

  signUp(value) {
    this.firebaseAuthService.register(value)
      .then((response) => {
        console.log(response)
        this.router.navigate(['home']);
      }, error => {
        console.log(error)
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }

}
