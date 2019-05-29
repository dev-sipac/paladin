import { Component, OnInit } from '@angular/core';
import {CyclecutDataModel} from "../cyclecut-data.model";
import {MatDialog} from "@angular/material";
import {CyclecutService} from "../cyclecut.service";
import {TypeofpartnerNewComponent} from "../../typeofpartner/typeofpartner-new/typeofpartner-new.component";
import {CyclecutNewComponent} from "../cyclecut-new/cyclecut-new.component";

@Component({
  selector: 'app-cyclecut-list',
  templateUrl: './cyclecut-list.component.html',
  styleUrls: ['./cyclecut-list.component.css']
})
export class CyclecutListComponent implements OnInit {
  codigo: string;
  descripcion: string;
  diacorte: string;
  diapago: string;
  cycledata: CyclecutDataModel [] = [];
  didFail = false;
  user: CyclecutDataModel;
  lowerIsBetter = false;
  filter = 'all';

  constructor(public dialog: MatDialog, private CycleService: CyclecutService) { }

  ngOnInit() {
    this.user = this.CycleService.userData;
    this.CycleService.dataEdited.subscribe(
      () => this.user = this.CycleService.userData
    );
    this.CycleService.dataLoaded.subscribe(
      (data: CyclecutDataModel[]) => {
        this.cycledata = data;
      }
    );
    this.CycleService.dataLoadFailed.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
  }

  onFilter(filter: string) {
    this.filter = filter;
  }

  onSelectLower(isBetter: boolean) {
    this.lowerIsBetter = isBetter;
  }

  getListGroupItemClass(item: CyclecutDataModel) {
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
    this.CycleService.onRetrieveData();
  }

  onClearData() {
    this.CycleService.onDeleteData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CyclecutNewComponent, {
      width: '450px',
      data: {codigo: this.codigo, descripcion: this.descripcion, diacorte: this.diacorte, diapago: this.diapago}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.descripcion = result;
      this.onGetResults();
    });
  }

}
