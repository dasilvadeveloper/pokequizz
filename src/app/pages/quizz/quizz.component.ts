import { Component, OnInit } from '@angular/core';
import { IPokemon } from 'src/app/model/IPokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {
  pokemon: IPokemon = {
    id: 1,
    name: 'test'
  }

  points: number = 0
  pointsSum: number = 6

  answered: boolean = false

  skips: number = 5

  pokemonNames: string[] = ['Poke 1', 'Poke 2', 'Poke 3', this.pokemon.name]



  constructor(public pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.reload()
  }

  validateSelection(pokeName: string) {
    if (this.pokemon.name == pokeName) {
      this.points += this.pointsSum
    } else {
      if (this.points >= this.pointsSum) {
        this.points -= this.pointsSum
      } else {
        this.points = 0
      }
    }

    setTimeout(() => {
      this.answered = false
      this.reload()
    }, 2000);

    this.answered = true
  }

  async reload() {

    // get rand pokemon id
    let pokeId = Math.floor(Math.random() * this.pokemonService.pokemonCount)

    await fetch('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + pokeId + '.gif')
      .then((data) => {
        if (data.status != 200) {
          this.reload()
        }
      })

    this.pokemonService.getById(pokeId)
      .subscribe(pokemon => {
        this.pokemon = pokemon
        this.get3Random().then(pokes => {
          this.pokemonNames = this.shuffle([...pokes, this.pokemon.name])
          this.answered = false


        })
      })
  }

  async get3Random(): Promise<string[]> {
    return Promise.all([this.getRandomPokeName(), this.getRandomPokeName(), this.getRandomPokeName()])
  }

  async getRandomPokeName(): Promise<string> {
    return new Promise<string>((resolve) => {

      for (let i = 0; i < 3; i++) {


        // get rand pokemon id
        let pokeId = Math.floor(Math.random() * this.pokemonService.pokemonCount)


        this.pokemonService.getById(pokeId)
          .subscribe(pokemon => {
              resolve(pokemon.name)
          })

      }

    })
  }

  skip() {
    this.answered = true

    if (this.points >= (this.pointsSum / 2)) {
      this.points -= (this.pointsSum / 2)
    }
    if (this.skips > 0) {
      this.skips--
    }

    this.reload()

  }

  shuffle(array: string[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


}
