import type { V2_MetaFunction } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Hello Skaters - PUC Rio Sprint I MVP Project" }];
};

export async function loader() {
  const result = await fetch("http://127.0.0.1:5000/")
    .then((res) => res)
    .catch((err) => { throw new Error('Deu algum problema ao acessar a API.') });

  return result;
}

export const ErrorBoundary = () => {
  return (
    <main className="flex items-center justify-center flex-col">
      <h1 className="my-10 font-bold text-2xl text-white block p-5 bg-red-500">Erro:</h1>
      <p>Não foi possível obter os dados da api</p>
      <p>Houve um erro, verifique se a api está rodando na porta 5000!</p>
    </main>
  );
};

export default function Index() {
  return (
    <main className="flex items-center justify-center flex-col border-t-2 w-7/12 py-3 mx-auto gap-5">
      <img src="https://static.nike.com/a/images/w_1920,c_limit/73a6ec94-cea8-49b1-9838-b70cee0c042f/how-to-skateboard-for-beginners.jpg" alt="Skateboarder" />
      <p>
            A aplicação de listar e cadastrar atletas e campeonatos de skate tem
            o objetivo de proporcionar uma experiência mais organizada e
            eficiente para os amantes do esporte. Com o crescente interesse pelo
            skate, essa ferramenta surge como uma solução para a gestão de
            informações sobre atletas e competições.</p>
            
            <p>Este MVP, Minimum Viable
            Product, é a primeira versão dessa aplicação que visa simplificar o
            processo de cadastramento e visualização de dados relacionados ao
            skate.
          </p>
    </main>
  );
}
