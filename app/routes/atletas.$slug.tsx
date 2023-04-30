import type { ActionArgs, LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
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
  const response = await fetch(`http://127.0.0.1:5000/atletas/${params.slug}`)
    .then((res) => res)
    .catch((err) => {
      throw new Error(err);
    });
  return response;
}


export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();

  const response = await fetch(`http://127.0.0.1:5000/atletas/${params.slug}`, {
    method: "PUT",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {});

  return json(response);
}


export default function AtletaRoute() {
  const { atleta } = useLoaderData()

  const data = useActionData<typeof action>();

  useEffect(() => {
    if (data && !data.error) {
      toast.success('Informações editadas sucesso');
    }
  }, [data]);
  

  return (
    <main className="flex items-center justify-center flex-col w-7/12 mx-auto">
      <h1 className="my-10 font-bold text-2xl">Detalhes do Atleta</h1>
      <Form method="post" className="w-full">
        <label>Nome:</label> <input type="text" defaultValue={atleta.nome} name="nome"/>
        <label>Cidade:</label> <input type="text" defaultValue={atleta.cidade} name="cidade"/>
        <label>Idade:</label> <input type="number" defaultValue={atleta.idade} name="idade"/>

        <fieldset>
            <label htmlFor="categoria">Categoria:</label>
            <select id="categoria" name="categoria" required defaultValue={atleta.categoria}>
              <option value="">Selecione uma categoria</option>
              <option value="Profissional">Profissional</option>
              <option value="Amador">Amador</option>
              <option value="Mirim">Mirim</option>
              <option value="Master">Old School - Master</option>
              <option value="Grand Master">Old School - Grand Master</option>
              <option value="Legend">Old School - Legend</option>
              <option value="Grand Legend">Old School - Grand Legend</option>
            </select>
          </fieldset>
          <br />

          <fieldset className="flex text-left">
            <label htmlFor="sexo">Sexo:</label>
            <input
              defaultChecked={atleta.sexo === "Masculino"}
              type="radio"
              id="sexo_m"
              name="sexo"
              value="Masculino"
              required
              className="w-12"
            />
            <label htmlFor="sexo_m">Masculino</label>
            <input
              type="radio"
              defaultChecked={atleta.sexo === "Feminino"}
              className="w-12"
              id="sexo_f"
              name="sexo"
              value="Feminino"
              
            />
            <label htmlFor="sexo_f">Feminino</label>
          </fieldset>
        <button type="submit" className="p-2 transition-all shadow-md hover:shadow-lg hover:text-white bg-green-100 hover:bg-green-600 mt-5 w-full rounded-md">Salvar dados</button>
      </Form>
      <nav className="flex w-full justify-between mt-10">
        <Link to="/atletas" className="nav-link">
          Listar Atletas
        </Link>

        <Link to="/" className="nav-link">
          Voltar
        </Link>
      </nav>
    </main>
  );
}
