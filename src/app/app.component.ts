import {Component} from '@angular/core';
import {QuickinfoComponent} from './quickinfo/quickinfo.component';
import {LaunchOverviewComponent} from './launch-overview/launch-overview.component';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [QuickinfoComponent, LaunchOverviewComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spacex-dashboard';

  ngOnInit() {

  }
}
