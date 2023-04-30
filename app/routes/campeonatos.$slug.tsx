import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData, Form, Link, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const ErrorBoundary = () => {
  return (
    <main className="flex items-center justify-center flex-col">
      <h1 className="my-10 font-bold text-2xl text-white block p-5 bg-red-500">Erro:</h1>
      <p>Não foi possível obter os dados da api</p>
      <p>Houve um erro, verifique se a api está rodando na porta 5000!</p>
      <p>Ou, de repente, você passou algum parâmetro errado.</p>

      <Link to="/" className="mt-10 nav-link">Retornar para o início</Link>
    </main>
  );
};


export async function loader({ params}: LoaderArgs) {
  const response = await fetch(`http://127.0.0.1:5000/campeonatos/${params.slug}`)
    .then((res) => res)
    .catch((err) => {
      throw new Error(err);
    });
  return response;
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();

  const response = await fetch(`http://127.0.0.1:5000/campeonatos/${params.slug}`, {
    method: "PUT",
    body: formData,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return response;
}


export default function CampeonatoRoute() {
  const { campeonato } = useLoaderData()

  const data = useActionData<typeof action>();
  
  console.log(data, 'data')

  useEffect(() => {
    if (data && !data.error) {
      toast.success('Informações editadas sucesso');
    }
  }, [data]);
  
  return (
    <main className="flex items-center justify-center flex-col w-7/12 mx-auto">
      <h1 className="my-10 font-bold text-2xl">Detalhes do Evento</h1>
      <Form method="post" className="w-full">
        <label>Nome:</label> <input type="text" defaultValue={campeonato.nome} name="nome"/>
        <label>Cidade:</label> <input type="text" defaultValue={campeonato.cidade} name="cidade"/>
        <label>Data:</label> <input type="date" defaultValue={new Date(campeonato.data).toISOString().split('T')[0]} name="data"/>
       
        <button type="submit" className="p-2 transition-all shadow-md hover:shadow-lg hover:text-white bg-green-100 hover:bg-green-600 mt-5 w-full rounded-md">Salvar dados</button>
      </Form>
      <nav className="flex w-full justify-between mt-10">
        <Link to="/campeonatos" className="nav-link">
          Listar Campeonatos
        </Link>

        <Link to="/" className="nav-link">
          Voltar
        </Link>
      </nav>
    </main>
  );
}
