import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'quickinfo',
  imports: [],
  templateUrl: './quickinfo.component.html',
  styleUrl: './quickinfo.component.scss'
})
export class QuickinfoComponent {
  title = 'spacex-dashboard';


  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }
}
