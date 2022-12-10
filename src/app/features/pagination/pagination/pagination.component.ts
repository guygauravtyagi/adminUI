import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Member } from 'src/app/common/data-models/members';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  @Input() paginationData!: Member[];
  @Input() rowsPerPage = 10;
  @Input() pageNumber = 1;

  @Output() selectionEvent: EventEmitter<Member[]> = new EventEmitter<Member[]>();
  @Output() deleteItemEvent: EventEmitter<Member> = new EventEmitter<Member>();
  @Output() editItemEvent: EventEmitter<Member> = new EventEmitter<Member>();
  @Output() pageCount: EventEmitter<number> = new EventEmitter<number>();

  visibleList: any[] = [];
  globalSelection = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginationData']) this.paginationData = changes['paginationData'].currentValue;
    if (changes['rowsPerPage']?.currentValue) this.rowsPerPage = changes['rowsPerPage'].currentValue;
    if (changes['pageNumber']?.currentValue) this.pageNumber = changes['pageNumber'].currentValue;
    if (this.paginationData && this.paginationData.length > 0) this.setVisibleList(this.paginationData, this.pageNumber, this.rowsPerPage);
  }

  setVisibleList(pageData: any[], pageNumber: number, rowsPerPage: number) {
    this.visibleList = pageData.filter((ele, index) => index < (pageNumber * rowsPerPage) && index >= ((pageNumber - 1) * rowsPerPage));
    this.boradCastPages();
  }

  globalClicked() {
    this.globalSelection = !this.globalSelection;
    this.visibleList.forEach(ele => {
      ele.isSelected = this.globalSelection;
    });
    this.selectionEvent.emit(this.visibleList);
  }

  itemClicked(item: Member) {
    this.globalSelection = false;
    item.isSelected = !item.isSelected;
    if (this.visibleList.reduce((isTrue, item) => isTrue && item.isSelected, true)) this.globalSelection = true;
    this.selectionEvent.emit(this.visibleList);
  }

  deleteItems(item: Member) {
    this.deleteItemEvent.emit(item);
  }

  editItems(item: Member) {
    item.enableEditing = !item.enableEditing;
    this.editItemEvent.emit(item);
  }

  boradCastPages() {
    this.pageCount.emit(Math.ceil(this.paginationData.length / this.rowsPerPage));
  }

}
