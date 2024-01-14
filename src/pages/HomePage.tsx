import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon } from "../interface";
import PokemonList from "../components/PokemonList";
import { BASE_URL } from "../config/config";

const HomePage = () => {
  const [listPokemons, setListPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const getPokemon = async () => {
    const res = await axios.get(`${BASE_URL}/pokemon?limit=20&offset=20`, {});
    console.log("Poke List data", res.data);
    setNextUrl(res.data.next);
    setListPokemons(res.data.results);
  };
  useEffect(() => {
    getPokemon();
  }, []);
  return (
    <div className="App">
      <div className="h-full min-h-screen flex flex-col items-center py-4 px-8 bg-black">
        <header className="pokemon-header items-center text-2xl tracking-tight font-semibold text-[#81b29a]">
          Pokemon
        </header>
        <div>
          <PokemonList pokemonList={listPokemons}></PokemonList>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
