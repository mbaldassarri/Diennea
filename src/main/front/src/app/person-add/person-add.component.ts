import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {PersonService} from '../services/person.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  registerForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]);
  username = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  age = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder,
              private personService: PersonService,
              public toast: ToastComponent) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      age: this.age
    });
  }

  setClassUsername() {
    return {'has-danger': !this.username.pristine && !this.username.valid};
  }

  setClassEmail() {
    return {'has-danger': !this.email.pristine && !this.email.valid};
  }

  setClassPassword() {
    return {'has-danger': !this.password.pristine && !this.password.valid};
  }

  setClassAge() {
    return {'has-danger': !this.age.pristine && !this.age.valid};
  }

  create() {
    /*var person = { username : 'usasdasdasd', email: 'amil@email.it', password : 'passwordasdasd', age: 12}*/
    this.personService.createPerson(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('You successfully registered!', 'success');
      },
      error => {
        this.toast.setMessage('There was an error with the database!', 'danger')
      }
    );
  }

}
