import { Routes } from '@angular/router';
import {LaunchOverviewComponent} from './launch-overview/launch-overview.component';
import {LaunchDetails} from './LaunchComponent/launch-details.component';
import {RocketDetails} from './RocketComponent/rocket-details.component';

export const routes: Routes = [
  { path: '', component: LaunchOverviewComponent },
  { path: 'details/launch/:id', component: LaunchDetails },
  { path: 'details/rocket/:id', component: RocketDetails },
];
