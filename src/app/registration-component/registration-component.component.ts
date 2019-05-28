import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css']
})
export class RegistrationComponentComponent implements OnInit {
  confirmUser = false;
  didFail = false;
  isLoading = false;
  username: string;
  email: string;
  password: string;
  validationcode: string;

  constructor(private authService: AuthService) {
  }


  ngOnInit() {
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.authService.authDidFail.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
  }

  onSubmit() {
    const usrName = this.username;
    const email = this.email;
    const password = this.password;
    this.authService.signUp(usrName, email, password);
  }

  onDoConfirm() {
    this.confirmUser = true;
  }

  onConfirm() {
    const usrName = this.username;
    const validationCode = this.validationcode;

    this.authService.confirmUser(usrName, validationCode);
  }

}
