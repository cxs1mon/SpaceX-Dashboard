import {Component, inject} from '@angular/core';
import {DetailsComponent} from '../details/details.component';
import {DetailsService} from '../service/details.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'rocket-details',
  imports: [
    DetailsComponent
  ],
  templateUrl: './rocket-details.component.html',
  styleUrl: './rocket-details.component.scss'
})
export class RocketDetails {
  rocketId: string = '5e9d0d95eda69955f709d1eb';
  rocket: any = [];
  launchId: string = '5eb87cd9ffd86e000604b32a';
  rocketActive: string = 'unknown';
  activeTab: 'overview' | 'payloads' | 'links' = 'overview';


  constructor(private detailsService: DetailsService, private activeRoute: ActivatedRoute, private router: Router) {
  };

  private service = inject(DetailsService)

  ngOnInit() {
    console.log('Id: ' + this.activeRoute.snapshot.paramMap.get('id'));
    this.detailsService.getRocket(this.rocketId).subscribe(rocketData => {
      console.log('Rocket: ', rocketData);
      this.rocket = rocketData;
      this.setRocketStatus();
    });
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
