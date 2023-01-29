import { AuthService } from 'src/app/shared/services/auth.service';
import { UserSimple } from 'src/app/shared/interfaces/user.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JoinCourseComponent } from '../../modals/join-course/join-course.component';
import { AppRoutesEnum } from 'src/app/shared/enums/routes.enum';
import { FindCourseComponent } from '../../modals/find-course/find-course.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() public user!: UserSimple | null;

  constructor(
    private auth: AuthService,
    private router: Router,
    public modal: MatDialog) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }

  public onLogout() {
    this.auth.onLogout();
    this.router.navigate(['/', 'auth']);
  }

  public onOpenFindCourseModal() {
    let modalRef = this.modal.open(FindCourseComponent, {
      width: '650px',
    });
  }

  public onOpenJoinCourseModal() {
    let modalRef = this.modal.open(JoinCourseComponent, {
      width: '400px',
    });
  }

  public get studentRoute() {
    return `/${AppRoutesEnum.Student}`;
  }
  public get teacherRoute() {
    return `/${AppRoutesEnum.Teacher}`;
  }
  public get authRoute() {
    return `/${AppRoutesEnum.Auth}`;
  }
  public get userRouter() {
    return `/${AppRoutesEnum.User}`;
  }
}
