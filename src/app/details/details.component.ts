import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {LaunchService} from '../service/launch.service';

@Component({
  selector: 'details-view',
  imports: [
    DatePipe,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgForOf
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  launch: any;
  launchpad: any;
  rocket: any;
  payloads: any[] = [];

  private service = inject(LaunchService)

  constructor(private launchService: LaunchService, private route: ActivatedRoute, private router: Router) {
  }

  activeTab: 'overview' | 'payloads' | 'links' = 'overview';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.launchService.getLaunchById(id).subscribe(data => {
        this.launch = data;
        console.log(this.launch);
        this.launchService.getRocket(this.launch.rocket).subscribe(data => {
          this.rocket = data;
          console.log(data)
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

  goToDetailsView() {
    this.router.navigate(['/']);
    console.log('Go to Details View');
  }
}
