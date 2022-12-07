import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Member } from 'src/app/common/data-models/members';
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

  constructor(private mainService: MainService) {
    this.members$ = this.mainService.getData()
    this.members$.subscribe(
      (data) => {
        this.members = data;
      }
    );
  }
}
