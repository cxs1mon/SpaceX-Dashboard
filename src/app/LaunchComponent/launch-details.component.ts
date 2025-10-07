import {Component, inject} from '@angular/core';
import {DetailsComponent} from '../details/details.component';
import {LaunchService} from '../service/launch.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DetailsService} from '../service/details.service';

@Component({
  selector: 'launch-details',
  imports: [
    DetailsComponent
  ],
  templateUrl: './launch-details.component.html',
  styleUrl: './launch-details.component.scss'
})
export class LaunchDetails {
  launch: any = [];
  launchpad: any = [];
  rocket: any = [];
  payloads: any[] = [];
  id!: string;
  success: boolean = true;
  launchStatus: "success" | "failure" | "upcoming" | "unknown" = "unknown";
  activeTab: 'overview' | 'payloads' | 'links' = 'overview';

  constructor(private launchService: LaunchService, private activeRoute: ActivatedRoute, private router: Router) {
  }

  private service = inject(DetailsService)


  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id')!;
    console.log("ID", this.id);
    // daten zu dem launch holen
    if (this.id) {
      this.launchService.getLaunchById(this.id).subscribe(data => {
        this.launch = data;
        this.launchStatus = this.getLaunchStatus(data);
        console.log(this.launch);
        this.launchService.getRocket(this.launch.rocket).subscribe(data => {
          this.rocket = data;
          console.log(this.rocket);
        })
        this.launchService.getLaunchpad(this.launch.launchpad).subscribe(data => {
          this.launchpad = data;
          console.log(data);
        })
        if (this.launch.payloads?.length) {
          this.launch.payloads.forEach((payloadId: string) => {
            this.launchService.getPayload(payloadId).subscribe(p => {
              this.payloads.push(p);
            });
          });
        }
      })
    }
  }

  setTab(tab: 'overview' | 'payloads' | 'links') {
    this.activeTab = tab;
  }

  goToOverview() {
    this.router.navigate(['/']);
  }

  getLaunchStatus(launch: any): 'success' | 'failure' | 'upcoming' | 'unknown' {
    if (launch.success === true) {
      return 'success';
    } else if (launch.success === false) {
      return 'failure';
    } else if (launch.success === null && launch.upcoming === true) {
      return 'upcoming';
    } else {
      return 'unknown';
    }
  }

  goToRocketDetails() {
    this.router.navigate(['/details/rocket/', '5e9d0d95eda69955f709d1eb']);
    //console.log(rocket.id);
    //console.log(rocket);
  }
}
