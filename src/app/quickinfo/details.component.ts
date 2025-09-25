import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {LaunchService} from '../service/launch.service';

@Component({
  selector: 'details-view',
  imports: [
    DatePipe,
    NgIf,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  launch: any;
  launchpad: any;
  rocket: any;

  private service = inject(LaunchService)

  constructor(private launchService: LaunchService, private route: ActivatedRoute) {
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
      })
    }
  }

  setTab(tab: 'overview' | 'payloads' | 'links') {
    this.activeTab = tab;
  }
}
