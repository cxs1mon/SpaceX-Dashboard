import {Component} from '@angular/core';
import {LaunchService} from '../service/launch.service';
import {Router} from '@angular/router';

@Component({
  selector: 'custom-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {};

  navigateHome() {
      this.router.navigate(['/']);
  }
}
