import { Component, OnInit } from '@angular/core';
import {TypeofplanData} from "../typeofplan-data.model";
import {MatDialog} from "@angular/material";
import {TypeofplanService} from "../typeofplan.service";
import {NewPlanComponent} from "../new-plan/new-plan.component";

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {
  codigo: string;
  descripcion: string;

  plandata: TypeofplanData[] = [];
  didFail = false;
  user: TypeofplanData;
  lowerIsBetter = false;
  filter = 'all';

  constructor(public dialog: MatDialog, private PlanService: TypeofplanService) { }

  ngOnInit() {
    this.user = this.PlanService.userData;
    this.PlanService.dataEdited.subscribe(
      () => this.user = this.PlanService.userData
    );
    this.PlanService.dataLoaded.subscribe(
      (data: TypeofplanData[]) => {
        this.plandata = data;
      }
    );
    this.PlanService.dataLoadFailed.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
  }

  onFilter(filter: string) {
    this.filter = filter;
  }

  onSelectLower(isBetter: boolean) {
    this.lowerIsBetter = isBetter;
  }

  getListGroupItemClass(item: TypeofplanData) {
    if (+item[this.filter] === +this.user[this.filter]) {
      return 'list-group-item-warning';
    }
    if (this.lowerIsBetter) {
      return this.user[this.filter] < item[this.filter] ? 'list-group-item-success' : 'list-group-item-danger';
    } else {
      return this.user[this.filter] > item[this.filter] ? 'list-group-item-success' : 'list-group-item-danger';
    }
  }

  onGetResults() {
    console.log('Hey');
    this.PlanService.onRetrieveData();
  }

  onClearData() {
    this.PlanService.onDeleteData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewPlanComponent, {
      width: '450px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.descripcion = result;
      this.onGetResults();
    });
  }

}
