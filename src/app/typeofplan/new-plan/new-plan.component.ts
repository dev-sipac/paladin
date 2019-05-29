import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TypeofplanService} from "../typeofplan.service";
import {TypeofplanData} from "../typeofplan-data.model";

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.css']
})
export class NewPlanComponent implements OnInit {

  codigo: string;
  descripcion: string;
  doInput = true;
  isLoading = false;
  couldNotLoadData = false;

  constructor(private planService: TypeofplanService, public dialogRef: MatDialogRef<NewPlanComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TypeofplanData ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.planService.dataIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.planService.dataLoadFailed.subscribe(
      (didFail: boolean) => {
        this.couldNotLoadData = didFail;
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    const data: TypeofplanData = {
      codigo: this.codigo as string,
      descripcion: this.descripcion as string
    };
    console.log(data);
    this.planService.onStoreData(data);
    this.dialogRef.close();
  }

}
