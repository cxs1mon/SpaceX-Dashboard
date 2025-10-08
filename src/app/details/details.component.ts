import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe} from '@angular/common';
import {LaunchService} from '../service/launch.service';


@Component({
  selector: 'details-view',
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgForOf,
    TitleCasePipe
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  launch: any;
  launchpad: any;
  rocket: any;
  payloads: any[] = [];
  id: string | null = null;

  private service = inject(LaunchService)

  constructor(private launchService: LaunchService, private route: ActivatedRoute, private router: Router) {
  }

  @Input() title!: string;
  @Input() stats1!: string;
  @Input() stats2!: string;
  @Input() stats3!: string;
  @Input() stats4!: string;
  @Input() infoBtn1!: string;
  @Input() description?: string;
  @Input() activeTab: 'overview' | 'payloads' | 'links' = 'overview';
  @Input() links:{[key:string]:string} = {};
  @Input() path!: string;
  @Input() payloadName?: string;

  @Output() rocketDetails = new EventEmitter<string>();
  @Output() goBack = new EventEmitter<string>();
  @Output() setTab = new EventEmitter<'overview' | 'payloads' | 'links'>();

  onRocketDetailsClick() {
    this.rocketDetails.emit();
  }

  onBackClick() {
    this.goBack.emit();
  }

  onSetTabClick(tab: 'overview' | 'payloads' | 'links') {
    this.setTab.emit(tab);
  }

  getLinkKeys(): string[] {
    return Object.keys(this.links);
  }

}
