import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class CoursePaginationService {
  private _pageEventUserCourses$: BehaviorSubject<PageEvent | null> = new BehaviorSubject<PageEvent | null>(null);
  public pageEventUserCourses$: Observable<PageEvent | null> = this._pageEventUserCourses$.asObservable();

  private _pageEventAllCourses$: BehaviorSubject<PageEvent | null> = new BehaviorSubject<PageEvent | null>(null);
  public pageEventAllCourses$: Observable<PageEvent | null> = this._pageEventUserCourses$.asObservable();

  constructor(
  ) { }

  public setPageEventUserCourses(e: PageEvent) {
    this._pageEventUserCourses$.next(e);
  }
  public setPageEventAllCourses(e: PageEvent) {
    this._pageEventAllCourses$.next(e);
  }
}
