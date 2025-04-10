import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
    });
    service = TestBed.inject(AuthService);
  });

  fit('Frontend_should_create_auth_service', () => {
    expect(service).toBeTruthy();
  });
});
