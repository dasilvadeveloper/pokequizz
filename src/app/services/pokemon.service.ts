import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IPokemon } from '../model/IPokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  

  baseURL: string = 'https://pokeapi.co/api/v2/'

  pokemonCount: number = 0

  constructor(public httpClient: HttpClient) { 
    this.getCount().subscribe((pokeCount: number) => {this.pokemonCount = pokeCount})
  }

  getById(id: number) : Observable<IPokemon>{
    return this.httpClient.get<IPokemon>(this.baseURL + 'pokemon/'+id)
  }

  getCount(): any {
    return this.httpClient.get<any>(this.baseURL + 'pokemon/')
      .pipe(map((pokemon: any) => { return pokemon.count }))
  
  }
 

  getAll(): any {
    this.httpClient.get<IPokemon[]>(this.baseURL + 'pokemon')
  }

}
