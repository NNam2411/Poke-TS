import React from "react";
import PokemonItem from "./PokemonItem";

interface Props {
  pokemonList: string[]; // Corrected type for array of PokemonItem
}

const PokemonList: React.FC<Props> = ({ pokemonList }) => {
  return (
    <div className="pokemon-list grid grid-cols-4 gap-5 my-10">
      {pokemonList &&
        pokemonList.map((pokemon, index) => (
          <PokemonItem key={index} pokemonDetails={pokemon} />
        ))}
    </div>
  );
};

export default PokemonList;
