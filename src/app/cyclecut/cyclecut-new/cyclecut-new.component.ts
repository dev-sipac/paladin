import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CyclecutService} from '../cyclecut.service';
import {CyclecutDataModel} from '../cyclecut-data.model';
import {TypeofpartnerData} from '../../typeofpartner/typeofpartner-data.model';

@Component({
  selector: 'app-cyclecut-new',
  templateUrl: './cyclecut-new.component.html',
  styleUrls: ['./cyclecut-new.component.css']
})
export class CyclecutNewComponent implements OnInit {
  codigo: string;
  descripcion: string;
  diacorte: string;
  diapago: string;
  doInput = true;
  isLoading = false;
  couldNotLoadData = false;

  constructor(private cyclecutService: CyclecutService, public dialogRef: MatDialogRef<CyclecutNewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CyclecutDataModel ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.cyclecutService.dataIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.cyclecutService.dataLoadFailed.subscribe(
      (didFail: boolean) => {
        this.couldNotLoadData = didFail;
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    const data: CyclecutDataModel = {
      codigo: this.codigo as string,
      descripcion: this.descripcion as string,
      diacorte: this.diacorte as string,
      diapago: this.diapago as string
    };
    console.log(data);
    this.cyclecutService.onStoreData(data);
    this.dialogRef.close();
  }

}
