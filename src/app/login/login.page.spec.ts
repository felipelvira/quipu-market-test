import { ComponentFixture, TestBed, waitForAsync, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Location } from "@angular/common";
import { RouterTestingModule } from '@angular/router/testing';
import { HomePage } from '../home/home.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
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
      declarations: [LoginPage],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(LoginPage);
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

  it('should login', fakeAsync(() => {

    component.userForm.controls['email'].setValue("test_user@quipu.co");
    component.userForm.controls['password'].setValue("123456789");
    
    expect(component.userForm.valid).toBeTruthy();
    spyOn(fbAuthSrv, 'login').and.returnValue(Promise.resolve(true))
    component.signIn(component.userForm.value)
    tick();

    expect(location.path()).toBe('/home');
  }))
});
