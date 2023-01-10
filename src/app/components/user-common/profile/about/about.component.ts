import { User } from './../../../../shared/interfaces/user.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @Input() public user!: Observable<User>;

  constructor() { }

  ngOnInit(): void {
  }

}
