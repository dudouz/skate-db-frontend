import type { LinksFunction } from "@remix-run/node";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { ToastContainer } from "react-toastify";
import toastsStyles from "react-toastify/dist/ReactToastify.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: toastsStyles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ToastContainer />
        <div className="w-7/12 flex mx-auto my-10 flex-col gap-5">
          <Link to="/">
            <h1 className="text-center w-full mb-5 border-b-2 font-bold text-5xl">
              Skaters Database
            </h1>
          </Link>

          <nav className="flex items-center justify-center flex-col gap-5">
            <ul className="flex gap-2 flex-col md:flex-row">
              <Link to="/atleta" className="nav-link">
                <li>Cadastrar Atleta</li>
              </Link>
              <Link className="nav-link" to="/atletas">
                <li>Listar Atletas</li>
              </Link>
              <li className="px-10 sm:hidden md:block"/>
              <Link className="nav-link" to="/campeonato">
                <li>Cadastrar Campeonato</li>
              </Link>
              <Link className="nav-link" to="/campeonatos">
                <li>Listar Campeonatos</li>
              </Link>
            </ul>
          </nav>
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
