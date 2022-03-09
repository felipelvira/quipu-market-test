import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Location } from "@angular/common";
import { RouterTestingModule } from '@angular/router/testing';
import { HomePage } from '../home/home.page';
// import { RouterModule } from '@angular/router/testing/testing';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let fbAuthSrv:FirebaseAuthService;
  let location: Location;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        RouterTestingModule.withRoutes(
          [{path: 'home', component: HomePage}]
        ),
        ReactiveFormsModule,
        AngularFireModule, AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [ReactiveFormsModule, FirebaseAuthService, AngularFireModule, AngularFirestoreModule, FirebaseAuthService],
      declarations: [RegisterPage],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    location = TestBed.get(Location);
    fixture = TestBed.createComponent(RegisterPage);
    fbAuthSrv = TestBed.get(FirebaseAuthService);

    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should register', fakeAsync(() => {

    component.userForm.controls['email'].setValue("test_user@quipu.co");
    component.userForm.controls['password'].setValue("123456789");
    component.userForm.controls['firstName'].setValue("Test");
    component.userForm.controls['lastName'].setValue("Quipu Market");
    component.userForm.controls['phoneNumber'].setValue("1235467893");
    (component.userForm.controls['gender'] as FormArray).value.push("D");
    
    spyOn(fbAuthSrv, 'register').and.returnValue(Promise.resolve(true))
    component.signUp(component.userForm.value)
    tick();

    expect(location.path()).toBe('/home');
  }))


});
