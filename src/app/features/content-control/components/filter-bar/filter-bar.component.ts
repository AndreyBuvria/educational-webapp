import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { FilterSortValues } from '../../enums';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit, AfterViewInit {
  public sortButtonValues: FilterSortValues[] = Object.values(FilterSortValues)
  public defaultSortTypeValue: FilterSortValues = FilterSortValues.Default;

  @Output() public sortType: EventEmitter<FilterSortValues> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.emitSortValue(this.defaultSortTypeValue);
  }

  public onChange(e: MatButtonToggleChange) {
    const value = e.value as FilterSortValues;
    this.emitSortValue(value);
  }
  public emitSortValue(value: FilterSortValues) {
    this.sortType.emit(value);
  }

}
