import {Component, inject} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spacex-dashboard';

  private router = inject(Router);

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');

        if (event.url.startsWith('/details')) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        }
      });

  }
}
