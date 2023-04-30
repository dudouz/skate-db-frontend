import type { ActionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const ErrorBoundary = () => {
  return (
    <main className="flex items-center justify-center flex-col">
      <h1 className="my-10 font-bold text-2xl text-white block p-5 bg-red-500">
        Erro:
      </h1>
      <p>Não foi possível obter os dados da api</p>
      <p>Houve um erro, verifique se a api está rodando na porta 5000!</p>
      <p>Ou, de repente, você passou algum parâmetro errado.</p>
      
      <Link to="/" className="mt-10 nav-link">Retornar para o início</Link>
    </main>
  );
};

export async function loader() {
  const data = await fetch("http://127.0.0.1:5000/campeonatos").then((res) =>
    res.json()
  );

  return data;
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);
  const id = entries.id;
  const response = await fetch(`http://127.0.0.1:5000/campeonatos/${id}`, {
    method: "delete",
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err);
    });

  return response;
}

export default function CampeonatosRoute() {
  const data = useLoaderData();

  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData) {
      toast.success("Deletado com sucesso");
    }
  }, [actionData]);

  return (
    <main className="flex items-center justify-center flex-col w-7/12 mx-auto text-center">
      <h1 className="my-10 font-bold text-2xl">Listar Campeonatos</h1>
      {data &&
        data.map((campeonato: any) => (
          <Form
            key={campeonato.id}
            method="post"
            className="grid grid-cols-[5fr,1fr] items-center gap-2 border-b-2 mb-2 w-full"
          >
            <Link
              to={`/campeonatos/${campeonato.id}`}
              className="sm:flex sm:flex-col md:grid  md:grid-cols-3 items-center justify-center gap-2 mb-2 w-full"
            >
              <div>
                <span className="font-bold">Nome:</span> {campeonato.nome}
              </div>

              <div>
                <span className="font-bold">Data:</span>{" "}
                {new Date(campeonato.data).toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                })}
              </div>

              <div>
                <span className="font-bold">Cidade:</span> {campeonato.cidade}
              </div>
            </Link>

            <button type="submit" className="delete-button">
              Deletar
            </button>

            <input type="text" hidden defaultValue={campeonato.id} name="id" />
          </Form>
        ))}

      <nav className="flex w-full justify-between mt-10">
        <Link to="/campeonato" className="nav-link">
          Adicionar novo
        </Link>

        <Link to="/" className="nav-link">
          Voltar
        </Link>
      </nav>
    </main>
  );
}
