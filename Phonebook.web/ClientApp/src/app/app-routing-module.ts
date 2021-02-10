import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhonebookEntriesListComponent } from './components/phonebooks/phonebook-entries-list/phonebook-entries-list.component';
import { PhonebookListComponent } from './components/phonebooks/phonebook-list/phonebook-list.component';


const routes: Routes = [
  { path: '', component: PhonebookListComponent, pathMatch: 'full' },
  { path: 'home', component: PhonebookListComponent, pathMatch: 'full' },
  { path: 'phoneBookEntries/:phoneBookId', component: PhonebookEntriesListComponent },
  { path: '**', component: PhonebookListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
