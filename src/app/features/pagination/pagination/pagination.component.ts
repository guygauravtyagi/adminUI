import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  @Input() paginationData!: any[];
  @Input() rowsPerPage = 10;
  @Input() pageNumber = 1;

  @Output() globalSelectionEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() valueSelectionEvent: EventEmitter<any[]> = new EventEmitter<any[]>();

  visibleList: any[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paginationData = changes['paginationData'].currentValue;
    if (changes['rowsPerPage']?.currentValue) this.rowsPerPage = changes['rowsPerPage'].currentValue;
    if (changes['pageNumber']?.currentValue) this.pageNumber = changes['pageNumber'].currentValue;
    if (this.paginationData && this.paginationData.length > 0) this.setVisibleList(this.paginationData, this.pageNumber, this.rowsPerPage);
  }

  setVisibleList(pageData: any[], pageNumber: number, rowsPerPage: number) {
    this.visibleList = pageData.filter((ele, index) => index < (pageNumber * rowsPerPage) && index >= ((pageNumber - 1) * rowsPerPage));
  }

  globalClicked(event: Event) {
    this.globalSelectionEvent.emit();
  }

}
