import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PokemonModel } from './model/pokemon.model';
import { PokemonService } from './services/pokemon.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Incubyte myapp';
  pokemonForm: FormGroup;
  allPokemon: PokemonModel[];
  pokemonToDisplay: PokemonModel[];
  pokemons: PokemonModel[];
  isLoaded: boolean;

  constructor(private fb: FormBuilder, private pokemonService: PokemonService) {
    this.pokemonForm = fb.group({});
    this.allPokemon = [];
    this.pokemonToDisplay = this.allPokemon;
    this.pokemons = [];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.pokemonForm = this.fb.group(
      {
        name: this.fb.control(''),
        type: this.fb.control(''),
        imgUrl: this.fb.control('')
      });
    this.pokemonService.getPokemon().subscribe(response => {
      for (let pokemon of response) {
        this.allPokemon.unshift(pokemon)
      }
      this.pokemonToDisplay = this.allPokemon
    });
  }
  public get Name(): FormControl {
    return this.pokemonForm.get('name') as FormControl;
  }

  public get Types(): FormControl {
    return this.pokemonForm.get('type') as FormControl;
  }

  public get ImageUrl(): FormControl {
    return this.pokemonForm.get('imgUrl') as FormControl;
  }

  clearForm() {
    this.Name.setValue('');
    this.Types.setValue('');
    this.ImageUrl.setValue('');
  }

  setIsloaded() {
    this.isLoaded = !this.isLoaded;
  }
  addPokemon() {
    let pokemon: PokemonModel = {
      name: this.Name.value,
      type: this.Types.value,
      imgUrl: this.ImageUrl.value,
    }

    this.pokemonService.addPokemon(pokemon).subscribe(response => {
      this.allPokemon.unshift(response)
      this.clearForm();
    })
  }
}
