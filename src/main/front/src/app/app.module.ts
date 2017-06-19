import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {PersonComponent} from './person/person.component';
import {PersonListComponent} from './person-list/person-list.component';
import {TableElementsCountComponent} from './table-elements-count/table-elements-count.component';
import {TablePaginationComponent} from './table-pagination/table-pagination.component';
import {TableSortComponent} from './table-sort/table-sort.component';
import {PersonService} from './services/person.service';
import { PersonAddComponent } from './person-add/person-add.component'
import { ToastComponent } from './toast/toast.component';
import { PersonEditComponent } from './person-edit/person-edit.component';

const appRoutes: Routes = [
    {path: '', component: PersonListComponent},
    {path: 'add', component: PersonAddComponent},
    {path: 'edit/:id', component: PersonEditComponent},
    {path: 'person/:id', component: PersonComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        PersonComponent,
        PersonListComponent,
        TableElementsCountComponent,
        TablePaginationComponent,
        TableSortComponent,
        PersonAddComponent,
        ToastComponent,
        PersonEditComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [PersonService, ToastComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
