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
    private medicationService: MedicationService) { }

  name = new FormControl('');
  description = new FormControl('');
  image: any;

  fileName: any;

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  imageInput(event) {

    let file = event.target.files[0];
    this.image = file;
    this.fileName = file.name;

  }

  addMedication() {
    console.log(this.name, this.description);

    const formData = new FormData();
    formData.append('description', this.description.value);
    formData.append('image', this.image);
    formData.append('name', this.name.value);

    if (this.description.value && this.name.value && this.image) {
      this.medicationService.addMedication(formData).subscribe((data) => {
        console.log(data);
        this.dialogRef.close();
      }, (err) => {
        console.log(err);

      })
    }
  }
}