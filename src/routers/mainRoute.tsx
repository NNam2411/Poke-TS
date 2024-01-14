import DetailPokemon from "../components/DetailPokemon";
import MainLayout from "../layout/mainLayout";
import HomePage from "../pages/HomePage";

export default function init(routes: object[]) {
  const route = {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "/pokemon/:id",
        element: <DetailPokemon></DetailPokemon>,
      },
    ],
  };
  routes.push(route);
}
