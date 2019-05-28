import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PaisesNuevoComponent } from '../paises-nuevo/paises-nuevo.component';
import { PaisesData } from '../paises-data.model';
import { PaisesService } from '../paises.service';

@Component({
  selector: 'app-paises-lista',
  templateUrl: './paises-lista.component.html',
  styleUrls: ['./paises-lista.component.css']
})
export class PaisesListaComponent implements OnInit {

  animal: string;
  name: string;  

  paisesdata: PaisesData[] = [];
  didFail = false;
  user: PaisesData;
  lowerIsBetter = false;
  filter = 'all';  

  
  constructor(public dialog: MatDialog, private PaisesService: PaisesService) {}

  
  ngOnInit() {
    this.user = this.PaisesService.userData;
    this.PaisesService.dataEdited.subscribe(
      () => this.user = this.PaisesService.userData
    );
    this.PaisesService.dataLoaded.subscribe(
      (data: PaisesData[]) => {
        this.paisesdata = data;
      }
    );
    this.PaisesService.dataLoadFailed.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
  
  }




  onFilter(filter: string) {
    this.filter = filter;
  }
  
  onSelectLower(isBetter: boolean) {
    this.lowerIsBetter = isBetter;
  }
  
  getListGroupItemClass(item: PaisesData) {
    if (+item[this.filter] === +this.user[this.filter]) {
      return 'list-group-item-warning';
    }
    if (this.lowerIsBetter) {
      return this.user[this.filter] < item[this.filter] ? 'list-group-item-success' : 'list-group-item-danger';
    } else {
      return this.user[this.filter] > item[this.filter] ? 'list-group-item-success' : 'list-group-item-danger';
    }
  }
  
  onStartSetData () {
    this.PaisesService.dataEdited.next(false);
  }
  
  onGetResults() {
    console.log('Hey');
    this.PaisesService.onRetrieveData();
  }
  onClearData() {
    this.PaisesService.onDeleteData();
  }
 
  openDialog(): void {
    const dialogRef = this.dialog.open(PaisesNuevoComponent, {
      width: '450px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
      this.onGetResults();
    });
  }  
}





