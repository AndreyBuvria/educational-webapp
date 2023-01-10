import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user!: Observable<User>;

  constructor(
    private userApiService: UserApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initUser();
  }

  private initUser() {
    this.user = this.route.params
      .pipe(
        switchMap((params: Params) => this.userApiService.getUser(params['name']))
    );
  }

}
