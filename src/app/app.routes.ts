import {Routes} from '@angular/router';
import {ContactListComponent} from './components/contact-list/contact-list.component';
import {ContactDetailsComponent} from './components/contact-list/contact-details/contact-details.component';
import {userRoleGuard} from './service/user-role.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/contacts', pathMatch: 'full'},
  {path: 'contacts', component: ContactListComponent},

  {path: 'contacts/:contactId', component: ContactDetailsComponent, canActivate: [userRoleGuard]},
  {path: 'contacts/my/best/group/:contactId', component: ContactDetailsComponent},
];
