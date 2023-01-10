import { AuthService } from 'src/app/shared/services/auth.service';
import { UserSimple } from './../../../../shared/interfaces/user.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JoinCourseComponent } from '../../modals/join-course/join-course.component';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() public user!: UserSimple | null;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private auth: AuthService,
    private router: Router,
    public modal: MatDialog) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onLogout() {
    this.auth.onLogout();
    this.router.navigate(['/', 'auth']);
  }

  public onOpenJoinCourseModal() {
    let modalRef = this.modal.open(JoinCourseComponent, {
      width: '400px',
    });

    modalRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    })
  }


}
