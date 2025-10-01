import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {LaunchService} from '../service/launch.service';
import {DatePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {max} from 'rxjs';

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
  favorites: any[] = [];
  searchTerm: string = '';
  searchYear: string = '';
  searchSort: string = 'asc';
  searchStatus = 'all';
  searchFavorite = 'all';
  page = 1;
  pageSize = 9;

  private service = inject(LaunchService)

  constructor(private launchService: LaunchService, private router: Router) {
  }

  ngOnInit() {
    this.loadLaunches();
    this.loadFavorites();
  }

  private loadLaunches() {
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
      this.updateShowMoreBtnVisibility();
    });
  }

  private loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  visibleLaunches() {
    const filtered = this.filteredLaunches();
    const start = 0;
    const end = this.page * this.pageSize;
    return filtered.slice(start, end);
  }

  filteredLaunches() {
    return this.launches.filter(l => {
      const matchesTerm = !this.searchTerm || l.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesYear = !this.searchYear || l.date_utc.includes(this.searchYear);
      const matchesStatus = this.searchStatus === 'all' || this.getStatus(l) === this.searchStatus;
      const matchesFavorite = this.searchFavorite === 'all' || this.isFavorite(l);
      return matchesTerm && matchesYear && matchesStatus && matchesFavorite;
    });
  }

  getStatus(l: any): string {
    if (l.success === true) return 'success';
    if (l.success === false) return 'failure';
    if (l.success === null && l.upcoming === true) return 'upcoming';
    return 'unknown';
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

  toggleFavorites(launch: any) {
    const index = this.favorites.findIndex(fav => fav.id === launch.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(launch);
    }
    console.log(this.favorites);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(launch: any): boolean {
    return this.favorites.some(fav => fav.id === launch.id);
  }

  showMoreLaunches() {
    const numOfFlights = this.filteredLaunches().length;
    const maxPages = Math.ceil(numOfFlights / this.pageSize);

    console.log(`Page ${this.page}`);
    console.log(`Num of flights ${numOfFlights}`);
    console.log(`Max Pages ${maxPages}`);

    if (this.page < maxPages) {
      this.page++;
    }

    this.updateShowMoreBtnVisibility();
  }

  updateShowMoreBtnVisibility() {
    const numOfFlights = this.filteredLaunches().length;
    const maxPages = Math.ceil(numOfFlights / this.pageSize);

    const showMoreBtn = document.getElementById('showMoreBtn');
    if (showMoreBtn) {
      showMoreBtn.style.visibility = this.page >= maxPages ? 'hidden' : 'visible';
    }
  }

  onFilterChange() {
    this.page = 1;
    this.updateShowMoreBtnVisibility();
  }

}
