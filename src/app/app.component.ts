import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Incubyte myapp';
  pokemonForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pokemonForm = fb.group({});
  }

  ngOnInit(): void {
    this.pokemonForm = this.fb.group(
      {
        name: this.fb.control(''),
        type: this.fb.control(''),
        imgUrl: this.fb.control('')
      }
    )
  }
}
