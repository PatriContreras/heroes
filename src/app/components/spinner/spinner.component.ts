import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule]
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
