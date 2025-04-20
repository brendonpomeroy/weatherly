import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router";
import { ReactNode } from "react";
import { HomePage } from "./pages/home-page";
import { CityPage } from "./pages/city-page";
  
  const router = createBrowserRouter([
    {
      path: "/",
      Component: HomePage,
    },
    {
        path: "/city/:city",
        Component: CityPage,
    }
  ]);
  
  export const Router: () => ReactNode = () => (
    <RouterProvider router={router} />
  );