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

  elementSelected(event: Member[]) {
    console.log(event);
  }

  elementDeleted(event: Member) {
    console.log(event);
  }

  elementEdited(event: Member) {
    console.log(event);
  }

  setPaginationButton(event: number) {
    this.setDefaultButton(this.buttonArray, true);
    for (let index = 0; index < event; index++) {
      this.buttonArray.push({
        id: index,
        name: JSON.stringify(index+1),
        value: index
      });      
    }
    this.setDefaultButton(this.buttonArray, false);
  }

  setDefaultButton(buttons: ButtonType[], isFront: boolean) {
    if (isFront) {
      buttons.push({
        id: -1,
        name: '<<',
        value: 0
      });
      buttons.push({
        id: -2,
        name: '<',
        value: 0
      });
    } else {
      buttons.push({
        id: -3,
        name: '>>',
        value: 0
      });
      buttons.push({
        id: -4,
        name: '>',
        value: 0
      });
    }
  }
}

