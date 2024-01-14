import axios from "axios";
import { BASE_URL } from "../config/config";
import { Pokemon } from "../interface";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart } from "chart.js";
const DetailPokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const getPokemonDetails = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
      console.log("Pokemon details:", response.data);
      setPokemon(response.data);
    } catch (error) {
      console.error("Error fetching pokemon details:", error);
      // Handle errors gracefully, e.g., display an error message
    } finally {
      setLoading(false);
    }
  };

  // const chartRef = useRef(null);
  // useEffect(() => {
  //   // Create chart data based on Pokemon stats
  //   if (chartRef && chartRef.current) {
  //     const chartInstance = new Chart(chartRef.current, {
  //       datasets: [
  //         {
  //           label: "Pokemon Stats",
  //           data: pokemon?.stats?.map((stat) => ({
  //             key: stat.stat.name,
  //             value: stat.base_stat,
  //           })),
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.2)",
  //             "rgba(54, 162, 235, 0.2)",
  //             "rgba(255, 206, 86, 0.2)",
  //             "rgba(75, 192, 192, 0.2)",
  //             "rgba(153, 102, 255, 0.2)",

  //             "rgba(255, 159, 64, 0.2)",
  //           ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(153, 102, 255, 1)",
  //             "rgba(255, 159, 64, 1)",
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     });
  //   }
  // }, [pokemon]);
  useEffect(() => {
    getPokemonDetails(Number(id));
  }, []);
  return (
    <div className=" bg-slate-800">
      <div className="pt-10 flex justify-center items-center">
        <div
          className="text-white font-bold cursor-pointer absolute left-5 p-2 bg-yellow-600 rounded-md"
          onClick={() => {
            window.history.back();
          }}
        >
          {"<"} Back
        </div>
        <h1 className="text-white text-3xl font-bold text-center">
          Detail Pokemon
        </h1>
      </div>
      <div className="h-full min-h-screen  flex flex-col items-center justify-center">
        <div className="flex flex-row gap-2 min-h-72 min-w-80">
          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-200 font-bold">{pokemon?.name}</span>
            <img
              src={pokemon?.sprites.other.showdown.front_default}
              alt="pokemon"
              className="w-40 h-40"
            />
          </div>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col">
              <span
                className="
          text-gray-200 font-bold mr-1 text-xl
          "
              >
                Skill:
              </span>
              {pokemon?.abilities &&
                pokemon.abilities.map((ability, index) => {
                  return (
                    <li
                      key={index}
                      className={`mx-1 ml-2 font-medium ${
                        ability.is_hidden ? "text-orange-600" : "text-white"
                      }`}
                    >
                      {ability.ability.name}
                    </li>
                  );
                })}
            </div>
            <div className="flex flex-col mt-5">
              <span
                className="
          text-gray-200 text-xl font-bold mr-1
          "
              >
                Basic stats:
              </span>
              <div className="flex flex-col items-start">
                {pokemon?.stats &&
                  pokemon.stats.map((stat, index) => {
                    return (
                      <li
                        key={index}
                        className={`text-center mx-1 font-medium
                      ${
                        stat.stat.name == "hp"
                          ? "text-green-600"
                          : stat.stat.name == "attack"
                          ? "text-red-700"
                          : stat.stat.name == "defense"
                          ? "text-yellow-600"
                          : stat.stat.name == "special-attack"
                          ? "text-blue-700"
                          : stat.stat.name == "special-defense"
                          ? "text-purple-700"
                          : stat.stat.name == "speed"
                          ? "text-pink-700"
                          : "text-white"
                      }`}
                      >
                        {stat.stat.name} : {stat.base_stat}
                      </li>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="mt-5">
            {/* <canvas ref={chartRef} width="400" height="300"></canvas> */}
          </div>
        </div>
      </div>
    </div>
  );
};

DetailPokemon.propTypes = {};

export default DetailPokemon;
