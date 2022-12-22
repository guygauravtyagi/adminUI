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
  editItemObj: Member = this.getEditItemsdefault();
  formSubmitted = false;
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginationData']) {
      this.paginationData = changes['paginationData'].currentValue;
      // setting global selection to false forcefully for bulk delete
      this.globalSelection = false;
    }
    if (changes['rowsPerPage']?.currentValue) this.rowsPerPage = changes['rowsPerPage'].currentValue;
    if (changes['pageNumber']?.currentValue) this.pageNumber = changes['pageNumber'].currentValue;
    if (this.paginationData) this.setVisibleList(this.paginationData, this.pageNumber, this.rowsPerPage);
  }

  setVisibleList(pageData: any[], pageNumber: number, rowsPerPage: number) {
    this.visibleList = pageData.filter((ele, index) => index < (pageNumber * rowsPerPage) && index >= ((pageNumber - 1) * rowsPerPage));
    this.broadCastPages();
  }

  globalClicked() {
    this.globalSelection = !this.globalSelection;
    this.visibleList.forEach(ele => {
      ele.isSelected = this.globalSelection;
    });
    this.selectionEvent.emit(this.visibleList.filter(ele => ele.isSelected));
  }

  itemClicked(item: Member) {
    this.globalSelection = false;
    item.isSelected = !item.isSelected;
    if (this.visibleList.reduce((isTrue, item) => isTrue && item.isSelected, true)) this.globalSelection = true;
    this.selectionEvent.emit(this.visibleList.filter(ele => ele.isSelected));
  }

  deleteItems(item: Member) {
    this.deleteItemEvent.emit(item);
  }

  editItems(item: Member) {
    this.formSubmitted = true;
    if (this.isNameValid() && this.isEmaliValid() && this.isRoleValid()) {
      this.editItemObj.enableEditing = false;
      this.editItemEvent.emit(this.editItemObj);
      this.editItemObj = this.getEditItemsdefault();
      this.formSubmitted = false;
    }
  }

  discardChanges(item: Member) {
    this.toggleEdit(item);
    this.editItemObj = this.getEditItemsdefault();
  }

  editClicked(item: Member) {
    this.toggleEdit(item);
    this.editItemObj = item;
  }

  isEmaliValid() {
    return this.editItemObj.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.editItemObj.email) ? true : false;
  }

  isNameValid() {
    return this.editItemObj.name && this.editItemObj.name.length > 2 ? true : false;
  }

  isRoleValid() {
    return this.editItemObj.role && (this.editItemObj.role === 'member' || this.editItemObj.role === 'admin') ? true : false;
  }

  getEditItemsdefault(): Member {
    return {
      id: '',
      name: '',
      email: '',
      role: ''
    };
  }

  toggleEdit(item: Member) {
    item.enableEditing = !item.enableEditing;
  }

  broadCastPages() {
    this.pageCount.emit(Math.ceil(this.paginationData.length / this.rowsPerPage));
  }

}
