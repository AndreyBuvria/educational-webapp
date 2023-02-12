import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/user-common/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user!: Observable<User>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initUser();
  }

  private initUser() {
    this.user = this.route.params
      .pipe(
        switchMap((params: Params) => this.userService.getUser(params['name']) as Observable<User>)
    );
  }

}
