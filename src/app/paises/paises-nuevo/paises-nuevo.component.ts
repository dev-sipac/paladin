import { Component, OnInit,Inject } from '@angular/core';
import { PaisesService } from '../paises.service';
import { PaisesData } from '../paises-data.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-paises-nuevo',
  templateUrl: './paises-nuevo.component.html',
  styleUrls: ['./paises-nuevo.component.css']
})
export class PaisesNuevoComponent implements OnInit {
  codigo: string;
  descripcion: string;
  doInput = true;
  isLoading = false;
  couldNotLoadData = false;

  constructor(private paisesService: PaisesService,public dialogRef: MatDialogRef<PaisesNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaisesData) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.paisesService.dataIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.paisesService.dataLoadFailed.subscribe(
      (didFail: boolean) => {
        this.couldNotLoadData = didFail;
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    const data: PaisesData = {
      codigo: this.codigo as string,
      descripcion: this.descripcion as string
    };
    console.log(data);
    this.paisesService.onStoreData(data);
    this.dialogRef.close();
  }

}
