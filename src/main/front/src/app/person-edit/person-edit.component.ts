import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../services/person.service";
import {Person} from "../domain";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  personId = 0;
  person: Person;
  editForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]);
  username = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  age = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private personService: PersonService) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      age: this.age
    });
    this.route.params.subscribe(params => {
      this.personId = params['id'];
      this.personService.getPerson(Number(this.personId)).subscribe(person => this.person = person);
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

  edit() {
   this.personService.editPerson(this.editForm.value, this.personId).subscribe(
     res => {
       this.router.navigate(['/']);
     },
     error => {
       return;
     });
  }

}
