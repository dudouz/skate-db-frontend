import type { ActionArgs } from "@remix-run/node";
import { Form, Link, Outlet, useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const ErrorBoundary = () => {
  return (
    <main className="flex items-center justify-center flex-col">
      <h1 className="my-10 font-bold text-2xl text-white block p-5 bg-red-500">Erro:</h1>
      <p>Não foi possível salvar os dados na api</p>
      <p>Houve um erro, verifique se a api está rodando na porta 5000!</p>
      <p>Ou, de repente, você passou algum parâmetro errado.</p>
      <Link to="/" className="mt-10 nav-link">Retornar para o início</Link>
    </main>
  );
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const response = await fetch("http://127.0.0.1:5000/campeonatos", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });

  return response;
}

export default function CampeonatoRoute() {
  const data = useActionData<typeof action>();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      toast.success('Campeonato adicionado com sucesso');
      navigate("/campeonatos");
    }
  }, [data, navigate]);

  return (
    <main className="flex items-center justify-center flex-col w-7/12 mx-auto">
      <h1 className="my-10 font-bold text-2xl">Cadastrar Campeonato</h1>
      <div className="grid gap-6 mb-6 w-full">
        <Form method="post">
          <label htmlFor="nome">Nome do Campeonato:</label>
          <input type="text" id="nome" name="nome" required />
          <br />

          <label htmlFor="cidade">Cidade:</label>
          <input type="text" id="cidade" name="cidade" required />
          <br />

          <label htmlFor="data">Data:</label>
          <input type="date" id="data" name="data" required />
          <br />

          <button type="submit" className="p-2 transition-all shadow-md hover:shadow-lg hover:text-white bg-green-100 hover:bg-green-600 mt-5 w-full rounded-md">Salvar dados</button>
        </Form>
      </div>
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
