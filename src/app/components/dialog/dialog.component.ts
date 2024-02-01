
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as text from '../../constants/text'
import { Hero } from 'src/app/models/heroes';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, ReactiveFormsModule]
})
export class DialogComponent implements OnInit {

  text = text;

  addHeroForm = new FormGroup({
    name: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    alterEgo: new FormControl('', Validators.required),
    firstAppearance: new FormControl('', Validators.required),
    characters: new FormControl('', Validators.required),
  })

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Hero) { }

  ngOnInit() {
    if (this.data) {
      this.addHeroForm = new FormGroup({
        name: new FormControl(this.data.name, Validators.required),
        publisher: new FormControl(this.data.publisher, Validators.required),
        alterEgo: new FormControl(this.data.alter_ego, Validators.required),
        firstAppearance: new FormControl(this.data.first_appearance, Validators.required),
        characters: new FormControl(this.data.characters, Validators.required),
      })
    }
  }

  close = () => { this.dialogRef.close() }
}
