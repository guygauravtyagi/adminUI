import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ButtonType, Member } from 'src/app/common/data-models/members';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public members$!: Observable<Member[]>;
  public members!: Member[];
  public pageNumber = 1;
  public buttonArray: ButtonType[] = [];
  public selectedMembers: Member[] = [];
  //Incase you want to set limit to the number of buttons use this var
  public buttonLimit = 10;

  constructor(private mainService: MainService) {
    this.members$ = this.mainService.getData()
    this.members$.subscribe(
      (data) => {
        this.members = data;
        this.members.map((ele) => {
          ele.isSelected = false;
          ele.enableEditing = false;
        })
      }
    );
  }

  setDisabledButtons(pageNumber: number) {
    this.buttonArray.forEach(ele => {
      if (pageNumber === 1 && (ele.id === -1 || ele.id === -2)) ele.isDisabled = true;
      else if (pageNumber === (this.buttonArray.length - 4) && (ele.id === -3 || ele.id === -4)) ele.isDisabled = true;
    });
  }

  elementSelected(event: Member[]) {
    this.selectedMembers = event;
  }

  elementDeleted(event: Member) {
    /**
     * creating a new array otherwise ngOnChanges in child won't consider it as change.
     * stupid right..?
     */
    this.members = this.members.filter(ele => ele.id !== event.id);
  }

  elementEdited(event: Member) {
    this.members = this.members.map((ele: Member) => {
      if(event.id === ele.id) ele = event;
      return ele;
    })
  }

  deleteSelected(event: Event) {
    this.selectedMembers.forEach(ele => {
      this.elementDeleted(ele);
    })
  }

  gotToPage(button: ButtonType) {
    if (button.id >= 0) this.pageNumber = button.id + 1;
    else if (button.id === -1) this.pageNumber = 1;
    else if (button.id === -2) this.pageNumber = this.pageNumber - 1;
    else if (button.id === -3) this.pageNumber = this.pageNumber + 1;
    else if (button.id === -4) this.pageNumber = this.buttonArray.length - 4;
  }

  setPaginationButton(event: number) {
    this.buttonArray.length = 0;
    this.setDefaultButton(this.buttonArray, true);
    for (let index = 0; index < event; index++) {
      if (index < this.buttonLimit)
        this.buttonArray.push({
          id: index,
          name: JSON.stringify(index + 1),
          value: index,
          isActive: false,
          isDisabled: false,
        });
    }
    this.setDefaultButton(this.buttonArray, false);
    this.setActiveButton(this.pageNumber);
    this.setDisabledButtons(this.pageNumber);
  }

  setActiveButton(value: number) {
    this.buttonArray.forEach(ele => {
      if (value !== 0 && ele.id === (value - 1)) ele.isActive = true;
      else ele.isActive = false;
    });
  }

  setDefaultButton(buttons: ButtonType[], isFront: boolean) {
    if (isFront) {
      buttons.push({
        id: -1,
        name: '<<',
        value: 0,
        isActive: false,
        isDisabled: false,
      });
      buttons.push({
        id: -2,
        name: '<',
        value: 0,
        isActive: false,
        isDisabled: false,
      });
    } else {
      buttons.push({
        id: -3,
        name: '>',
        value: 0,
        isActive: false,
        isDisabled: false,
      });
      buttons.push({
        id: -4,
        name: '>>',
        value: 0,
        isActive: false,
        isDisabled: false,
      });
    }
  }
}

