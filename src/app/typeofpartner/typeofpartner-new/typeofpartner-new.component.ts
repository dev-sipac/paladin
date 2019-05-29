import {Component, Inject, OnInit} from '@angular/core';
import {TypeofpartnerService} from '../typeofpartner.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TypeofpartnerData} from '../typeofpartner-data.model';

@Component({
  selector: 'app-typeofpartner-new',
  templateUrl: './typeofpartner-new.component.html',
  styleUrls: ['./typeofpartner-new.component.css']
})
export class TypeofpartnerNewComponent implements OnInit {
  codigo: string;
  descripcion: string;
  doInput = true;
  isLoading = false;
  couldNotLoadData = false;

  constructor(private typepartnerService: TypeofpartnerService, public dialogRef: MatDialogRef<TypeofpartnerNewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TypeofpartnerData ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.typepartnerService.dataIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.typepartnerService.dataLoadFailed.subscribe(
      (didFail: boolean) => {
        this.couldNotLoadData = didFail;
        this.isLoading = false;
      }
    );
  }
  onSubmit() {
    const data: TypeofpartnerData = {
      codigo: this.codigo as string,
      descripcion: this.descripcion as string
    };
    console.log(data);
    this.typepartnerService.onStoreData(data);
    this.dialogRef.close();
  }

}
