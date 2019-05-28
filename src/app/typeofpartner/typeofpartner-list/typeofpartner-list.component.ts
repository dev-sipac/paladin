import { Component, OnInit } from '@angular/core';
import {TypeofpartnerData} from '../typeofpartner-data.model';
import {MatDialog} from '@angular/material';
import {TypeofpartnerService} from '../typeofpartner.service';
import {TypeofpartnerNewComponent} from '../typeofpartner-new/typeofpartner-new.component';

@Component({
  selector: 'app-typeofpartner-list',
  templateUrl: './typeofpartner-list.component.html',
  styleUrls: ['./typeofpartner-list.component.css']
})
export class TypeofpartnerListComponent implements OnInit {

  codigo: string;
  descripcion: string;

  partnerdata: TypeofpartnerData[] = [];
  didFail = false;
  user: TypeofpartnerData;
  lowerIsBetter = false;
  filter = 'all';

  constructor(public dialog: MatDialog, private PartnerService: TypeofpartnerService) { }

  ngOnInit() {
    this.user = this.PartnerService.userData;
    this.PartnerService.dataEdited.subscribe(
      () => this.user = this.PartnerService.userData
    );
    this.PartnerService.dataLoaded.subscribe(
      (data: TypeofpartnerData[]) => {
        this.partnerdata = data;
      }
    );
    this.PartnerService.dataLoadFailed.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
  }

  onFilter(filter: string) {
    this.filter = filter;
  }

  onSelectLower(isBetter: boolean) {
    this.lowerIsBetter = isBetter;
  }

  getListGroupItemClass(item: TypeofpartnerData) {
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
    this.PartnerService.onRetrieveData();
  }

  onClearData() {
    this.PartnerService.onDeleteData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TypeofpartnerNewComponent, {
      width: '450px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.descripcion = result;
      this.onGetResults();
    });
  }

}
