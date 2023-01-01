import { Params, ActivatedRoute } from '@angular/router';
import { User } from './../../../shared/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/shared/services/user-api.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public user: Observable<User> = this.route.params
    .pipe(
      switchMap((params: Params) => this.userService.getUser(params['name']))
  );

  constructor(private userService: UserApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
