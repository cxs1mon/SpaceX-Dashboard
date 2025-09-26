import { Routes } from '@angular/router';
import {DetailsComponent} from './details/details.component';
import {LaunchOverviewComponent} from './launch-overview/launch-overview.component';

export const routes: Routes = [
  { path: '', component: LaunchOverviewComponent },
  { path: 'details/:id', component: DetailsComponent }
];
