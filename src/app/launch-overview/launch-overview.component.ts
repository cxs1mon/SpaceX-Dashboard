import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {LaunchService} from '../service/launch.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
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

  constructor(private launchService: LaunchService) {
  }

  ngOnInit() {
    this.launchService.getLaunches().subscribe(data => {
      this.launches = data;
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
}
