import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {LaunchService} from '../service/launch.service';
import {DatePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'launch-overview',
  imports: [
    NgForOf,
    DatePipe,
    NgIf,
    FormsModule
  ],
  templateUrl: './launch-overview.component.html',
  styleUrl: './launch-overview.component.scss'
})
export class LaunchOverviewComponent {
  title = 'spacex-dashboard';
  launches: any[] = [];
  searchTerm: string = '';
  searchYear: string = '';
  searchSort: string = 'asc';

  private service = inject(LaunchService)

  constructor(private launchService: LaunchService, private router: Router) {
  }

  ngOnInit() {
    this.launchService.getLaunches().subscribe(data => {
      this.launches = data.slice(0, 12);
      this.launches.forEach(l => {
        this.launchService.getRocket(l.rocket).subscribe(rocketData => {
          l.rocketName = rocketData.name;
        });
        this.launchService.getLaunchpad(l.launchpad).subscribe(launchpadData => {
          l.launchpadName = launchpadData.name;
          l.launchpadLocation = launchpadData.region;
        });
      });
    });
  }



  filteredLaunches() {
    if (!this.searchTerm && !this.searchYear) {
      return this.launches;
    } else if (this.searchTerm && !this.searchYear) {
      return this.launches.filter(l =>
        l.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else if (!this.searchTerm && this.searchYear) {
      return this.launches.filter(l =>
        l.date_utc.includes(this.searchYear)
      );
    } else {
      return this.launches.filter(l =>
        l.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        l.date_utc.includes(this.searchYear)
      );
    }
  }

  onSortChange() {
    if (this.searchSort === 'desc') {
      this.launches = [...this.launches].reverse();
    } else {
      this.launches = [...this.launches].reverse();
    }
  }

  goToDetailsView(launch: any) {
    this.router.navigate(['/details', launch.id]);
    console.log('Go to Details View');
  }


}
