import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon } from "../interface";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config";

interface Props {
  pokemonDetails: {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
  }; // Use singular for clarity
}

const PokemonItem: React.FC<Props> = (props) => {
  const { name } = props.pokemonDetails;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getPokemonDetails = async (name: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
      console.log("Pokemon details:", response.data);
      setPokemon(response.data);
    } catch (error) {
      console.error("Error fetching pokemon details:", error);
      // Handle errors gracefully, e.g., display an error message
    } finally {
      setLoading(false);
    }
  };

  const navigateToDetail = (id: number) => {
    navigate(`/pokemon/${id}`);
  };

  useEffect(() => {
    getPokemonDetails(name);
  }, [name]);

  return (
    <div className=" ">
      {loading ? (
        <div className="pokemon-item__loading">Loading...</div>
      ) : pokemon ? (
        <div
          className="pokemon-item w-fit p-3 bg-slate-600 rounded-md cursor-pointer"
          onClick={() => navigateToDetail(pokemon.id)}
        >
          <div className="flex justify-center">
            <img src={pokemon.sprites.front_default} alt={name} />
          </div>
          <div className="text-center text-white font-bold">{name}</div>
          <div className="flex flex-row justify-center ">
            {pokemon.abilities &&
              pokemon.abilities.map((ability, index) => {
                return (
                  <div
                    key={index}
                    className={`mx-1 font-medium ${
                      ability.is_hidden ? "text-orange-600" : "text-white"
                    }`}
                  >
                    {ability.ability.name}
                  </div>
                );
              })}
          </div>
          <div className="grid grid-cols-3">
            {pokemon.stats &&
              pokemon.stats.map((stat, index) => {
                return (
                  <div
                    key={index}
                    className={`text-center mx-1 font-medium
                      ${
                        stat.stat.name == "hp"
                          ? "text-green-700"
                          : stat.stat.name == "attack"
                          ? "text-red-700"
                          : stat.stat.name == "defense"
                          ? "text-yellow-700"
                          : stat.stat.name == "special-attack"
                          ? "text-blue-900"
                          : stat.stat.name == "special-defense"
                          ? "text-purple-700"
                          : stat.stat.name == "speed"
                          ? "text-pink-700"
                          : "text-white"
                      }`}
                  >
                    {stat.stat.name}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="pokemon-item__error">Failed to load pokemon</div>
      )}
    </div>
  );
};

export default PokemonItem;
