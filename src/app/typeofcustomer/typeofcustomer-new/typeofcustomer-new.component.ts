import {Component, Inject, OnInit} from '@angular/core';
import {TypeofcustomerService} from '../typeofcustomer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TypeofcustomerDataModel} from '../typeofcustomer-data.model';

@Component({
  selector: 'app-typeofcustomer-new',
  templateUrl: './typeofcustomer-new.component.html',
  styleUrls: ['./typeofcustomer-new.component.css']
})
export class TypeofcustomerNewComponent implements OnInit {
  codigo: string;
  descripcion: string;
  doInput = true;
  isLoading = false;
  couldNotLoadData = false;

  constructor(private typeofcustomerService: TypeofcustomerService, public dialogRef: MatDialogRef<TypeofcustomerNewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TypeofcustomerDataModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.typeofcustomerService.dataIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.typeofcustomerService.dataLoadFailed.subscribe(
      (didFail: boolean) => {
        this.couldNotLoadData = didFail;
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    const data: TypeofcustomerDataModel = {
      codigo: this.codigo as string,
      descripcion: this.descripcion as string
    };
    console.log(data);
    this.typeofcustomerService.onStoreData(data);
    this.dialogRef.close();
  }
}
