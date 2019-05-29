import { Component, OnInit } from '@angular/core';
import {TypeofcustomerDataModel} from '../typeofcustomer-data.model';
import {MatDialog} from '@angular/material';
import {TypeofcustomerService} from '../typeofcustomer.service';
import {TypeofpartnerNewComponent} from '../../typeofpartner/typeofpartner-new/typeofpartner-new.component';
import {TypeofcustomerNewComponent} from "../typeofcustomer-new/typeofcustomer-new.component";

@Component({
  selector: 'app-typeofcustomer-list',
  templateUrl: './typeofcustomer-list.component.html',
  styleUrls: ['./typeofcustomer-list.component.css']
})
export class TypeofcustomerListComponent implements OnInit {
  codigo: string;
  descripcion: string;

  customerdata: TypeofcustomerDataModel[] = [];
  didFail = false;
  user: TypeofcustomerDataModel;
  lowerIsBetter = false;
  filter = 'all';

  constructor(public dialog: MatDialog, private CustomerService: TypeofcustomerService) { }

  ngOnInit() {
    this.user = this.CustomerService.userData;
    this.CustomerService.dataEdited.subscribe(
      () => this.user = this.CustomerService.userData
    );
    this.CustomerService.dataLoaded.subscribe(
      (data: TypeofcustomerDataModel[]) => {
        this.customerdata = data;
      }
    );
    this.CustomerService.dataLoadFailed.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
  }

  onFilter(filter: string) {
    this.filter = filter;
  }

  onSelectLower(isBetter: boolean) {
    this.lowerIsBetter = isBetter;
  }

  getListGroupItemClass(item: TypeofcustomerDataModel) {
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
    this.CustomerService.onRetrieveData();
  }

  onClearData() {
    this.CustomerService.onDeleteData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TypeofcustomerNewComponent, {
      width: '450px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.descripcion = result;
      this.onGetResults();
    });
  }

}
