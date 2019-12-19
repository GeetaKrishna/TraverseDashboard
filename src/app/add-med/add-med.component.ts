import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicationService } from '../_services/medication.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-med',
  templateUrl: './add-med.component.html',
  styleUrls: ['./add-med.component.css']
})

export class AddMedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddMedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private medicationService: MedicationService) { }

  name = new FormControl('');
  description = new FormControl('');

  fileName: any;
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  imageInput(event) {
    let file = event.target.files[0];
    this.data.image = file;
    this.fileName = file.name;

    console.log(this.data.image);
  }
  successAdding() {
    console.log(this.name, this.description);

    const formData = new FormData();
    formData.append('description', this.description.value);
    formData.append('image', this.data.image);
    formData.append('name', this.name.value);

    if (this.description.value && this.name.value && this.data.image) {
      this.medicationService.addMedication(formData).subscribe((data) => {
        console.log(data);
        this.dialogRef.close();
      }, (err) => {
        console.log(err);

      })
    }
  }
}
export interface DialogData {
  medicineName: string;
  description: string;
  image: string;
}
