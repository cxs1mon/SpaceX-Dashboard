import {Component, inject} from '@angular/core';
import {DetailsComponent} from '../details/details.component';
import {ActivatedRoute, Router} from '@angular/router';
import {LaunchService} from '../service/launch.service';

@Component({
  selector: 'rocket-details',
  imports: [
    DetailsComponent
  ],
  templateUrl: './rocket-details.component.html',
  styleUrl: './rocket-details.component.scss'
})
export class RocketDetails {
  rocketId!: string;
  rocket: any = [];
  launchId: string | null = '';
  rocketActive: string = 'unknown';
  activeTab: 'overview' | 'payloads' | 'links' = 'overview';
  links: {} = {};
  imageLinks: string[] = [];
  successRate: string = '';

  constructor(private launchService: LaunchService, private activeRoute: ActivatedRoute, private router: Router) {
  };

  private service = inject(LaunchService);


  ngOnInit() {
    this.rocketId = this.activeRoute.snapshot.paramMap.get('id')!;
      this.launchService.getRocket(this.rocketId).subscribe(rocketData => {
        console.log('Rocket: ', rocketData);
        this.rocket = rocketData;
        this.successRate = this.rocket.success_rate_pct + '% success'
        this.setRocketStatus();
        this.imageLinks = this.rocket.flickr_images || [];
        this.links = {
          images: this.imageLinks.length > 0 ? this.imageLinks : ['No images for this flight'],
          wikipedia: this.rocket.wikipedia || 'No wikipedia article Link for this flight',
        };
      })
      this.launchService.launchId$.subscribe(id => {
        this.launchId = id;
      });
      console.log(this.launchId);
  }

  setTab(tab: 'overview' | 'payloads' | 'links') {
    this.activeTab = tab;
  }

  setRocketStatus() {
    if (this.rocket.active == true) {
      this.rocketActive = 'active';
    } else if (this.rocket.active == false) {
      this.rocketActive = 'inactive';
    } else {
      this.rocketActive = 'status unknown';
    }
  }

  goBackToLaunch() {
    this.router.navigate(['/details/launch', this.launchId]);
  }

}
