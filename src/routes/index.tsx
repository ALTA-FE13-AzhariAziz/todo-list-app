import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { FC, useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";

import { ThemeContext } from "@/utils/context";
import { handleAuth } from "@/utils/redux/reducers/reducer";
import Home from "@/pages/index";
import Detail from "@/pages/detail";
axios.defaults.baseURL = "https://api.todoist.com/rest/v2";

const Router: FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  // const token = localStorage.getItem("tkn")
  const [cookie] = useCookies(["tkn", "uname"]);
  // useDispatch untuk merubah nilai dari suatu state
  const dispatch = useDispatch();
  const getToken = cookie.tkn;

  const router = createBrowserRouter([
    {
      path: "/", // <~ path param
      element: <Home />,
    },
    {
      path: "/detail/:id", // <~ path param
      element: <Detail />,
    },
  ]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;
