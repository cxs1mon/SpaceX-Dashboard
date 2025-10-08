import { Routes } from '@angular/router';
import {LaunchOverviewComponent} from './launch-overview/launch-overview.component';
import {LaunchDetails} from './launch-details/launch-details.component';
import {RocketDetails} from './rocket-details/rocket-details.component';

export const routes: Routes = [
  { path: '', component: LaunchOverviewComponent },
  { path: 'details/launch/:id', component: LaunchDetails },
  { path: 'details/rocket/:id', component: RocketDetails },
];
