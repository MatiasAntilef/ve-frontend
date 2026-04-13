import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [
        {
          provide: OidcSecurityService,
          useValue: {
            checkAuth: () => of({ isAuthenticated: false, userData: null }),
            authorize: () => undefined,
            logoff: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
